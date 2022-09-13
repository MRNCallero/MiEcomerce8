const fs = require('fs');
const path = require('node:path');
const searchPicture = require('../helpers/searchPicture');
let readBasePictures = ()=>JSON.parse(fs.readFileSync(path.join(__dirname, "/../api/data/pictures.json")));
let writeBasePictures = (Pictures)=>fs.writeFileSync(path.join(__dirname, "/../api/data/pictures.json"), JSON.stringify(Pictures));



function deletePicture(req,res,idPicture){

    try {
        const Pictures = readBasePictures()

        if(!searchPicture(Number(idPicture),Pictures)){
            return res.status(404).json({
                        msj:"Not Found"
                    });
        }
       const PicturesFiltradas = Pictures.filter(el => el.id !== Number(idPicture));
       writeBasePictures(PicturesFiltradas)
       res.status(200).json({msj:"Ok", Pictures:PicturesFiltradas});
 
    } catch (error) {
       console.log(error);
       res.status(500).json({msj:"Server Error"});
    }
}
module.exports= deletePicture