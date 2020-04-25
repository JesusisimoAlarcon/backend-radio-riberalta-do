const express = require('express');
const controller = require('../controllers/InfografiaController ');
class Infografia {

    constructor() {
        this.infografia = express.Router();
        this.config();
    }

    config() {
        this.infografia.get('/', controller.infografiaController.list);
        this.infografia.get('/:id', controller.infografiaController.getOne);
        this.infografia.get('/noticia/:idnoticia', controller.infografiaController.getInfografiasByNoticia);
        this.infografia.post('/', controller.infografiaController.create);
        this.infografia.post('/audio', controller.infografiaController.upload_audio);
        this.infografia.post('/video', controller.infografiaController.upload_video);
        this.infografia.post('/images', controller.infografiaController.upload_imagen);
        this.infografia.put('/:id', controller.infografiaController.update);
        this.infografia.delete('/:id', controller.infografiaController.delete);
    }
}
module.exports = new Infografia().infografia;