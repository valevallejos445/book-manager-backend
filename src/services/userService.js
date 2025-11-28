// src/services/userService.js
const userRepository = require('../repositories/userRepository');
const jwtUtils = require('../utils/jwt');
const emailUtils = require('../utils/email');

const register = async (userData) => {
  const existingUser = await userRepository.findByEmail(userData.email);
  if (existingUser) throw new Error('El email ya está registrado');

  // ✅ Marca el usuario como verificado inmediatamente
  const user = await userRepository.save({ ...userData, isVerified: true });

  return { message: 'Usuario registrado y verificado automáticamente.' };
};
const verifyEmail = async (token) => {
  const payload = jwtUtils.verifyToken(token);
  const user = await userRepository.findById(payload.id);
  if (!user) throw new Error('Usuario no encontrado');
  if (user.isVerified) throw new Error('Cuenta ya verificada');

  await userRepository.updateVerification(user._id);
  return { message: 'Cuenta verificada exitosamente' };
};

const login = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('Credenciales inválidas');
  // ✅ Comentá esta línea para permitir login sin verificación
  // if (!user.isVerified) throw new Error('Por favor verifica tu email antes de iniciar sesión');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Credenciales inválidas');

  const token = jwtUtils.generateToken({ id: user._id });
  return { token, user: { id: user._id, name: user.name, email: user.email } };
};