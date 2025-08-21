const jwt = require('jsonwebtoken')

const authenticateToken = (role) => (req, res, next) =>{
    try {
        // header - body - query - params
        const token = req.header('Authorization');  
        
        if (!token) {
            return res.status(401).json({message: 'Token requerido'})
        }

        const tokenVerification = jwt.verify(token, process.env.JWT_SECRET)
        
        if (role === tokenVerification.role) {
            return next();
        }else{
            return res.status(401).json({message:'No tienes los permisos para poder realizar esta acción'})
        }
    } catch (error) {
        res.status(500).json({error: 'Error al realizar la peticion'})
    }
}

module.exports = authenticateToken;