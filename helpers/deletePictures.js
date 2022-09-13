const fs = require('fs');
const path = require('node:path');
let writeBasePictures = (Pictures) => fs.writeFileSync(path.join(__dirname, "/../api/data/pictures.json"), JSON.stringify(Pictures));



function deletePicture( idPicture,pArray) {

    console.log(pArray)
    const PicturesFiltradas = pArray.filter(el => el.id !== Number(idPicture));
    writeBasePictures(PicturesFiltradas)
    return PicturesFiltradas
}
module.exports = deletePicture