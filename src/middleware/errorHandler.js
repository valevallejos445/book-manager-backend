// src/middleware/errorHandler.js (CÓDIGO CORREGIDO)

const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Error interno del servidor';

    // Opcional: Loguear el error completo para debug en consola de Render
    console.error(err.stack); 

    // 1. Asignar Status Code basado en el mensaje de error (La solución rápida)

    // Error de Autenticación/Credenciales (login, token inválido)
    if (err.message && (err.message.includes('inválidas') || err.message.includes('token'))) {
        statusCode = 401; // Unauthorized
        message = err.message;
    }
    // Error de Registro (Conflicto: email ya existe)
    else if (err.message && (err.message.includes('registrado') || err.message.includes('existe'))) {
        statusCode = 409; // Conflict
        message = err.message;
    }
    // Error de Validación (Ej: express-validator)
    else if (err.message && err.message.includes('Validation failed')) {
        statusCode = 400; // Bad Request
        message = err.message; 
    }
    // Si el error ya tenía un status code (ej: de una librería), lo usamos.
    else if (err.statusCode) {
        statusCode = err.statusCode;
        message = err.message;
    }
    
    // Si sigue siendo 500, mantenemos el mensaje genérico por seguridad.
    // Si es 4xx, usamos el mensaje original del error.

    res.status(statusCode).json({
        success: false,
        message: message,
    });
};

module.exports = errorHandler;