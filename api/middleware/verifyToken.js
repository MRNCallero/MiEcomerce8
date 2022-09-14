const jwt = require('jsonwebtoken');
const { request } = require('express')

const verifyToken = async (req, res, next ) => {
    const bearerHeader = req.headers['authorization']
    if( bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, process.env.JWT_MIECOMMERCE, (err, data) => {
            if(err) {
                res.status(403).json({mensaje: "No permitido"});
            }else{
                if(data)
                    req.params.jwtauth = JSON.stringify(data);
                next();
            }
        });
    }
    else {
        res.status(403).json({mensaje: "No permitido"});
    }
}

module.exports = verifyToken;