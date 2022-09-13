const jwt = require('jsonwebtoken');

const isLogged = ( req,res,next)=> {
    try{
        next();
    }catch(err){
        res.status(404).send({error :err})

    }
}

module.exports = isLogged;