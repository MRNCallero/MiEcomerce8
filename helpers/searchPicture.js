const fs = require('fs');


function buscador(pId,pBase){
    const theObject = pBase.find(elem => elem.id === pId)

    return theObject;
}

module.exports = buscador