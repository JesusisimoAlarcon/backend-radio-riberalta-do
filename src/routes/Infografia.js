const express = require('express');
const controller = require('../controllers/InfografiaController ');
const auth = require('../libs/auth');
class Infografia {

    constructor() {
        this.infografia = express.Router();
        this.config();
    }

    config() {
        this.infografia.get('/', controller.infografiaController.list);
        this.infografia.get('/:id', controller.infografiaController.getOne);
        this.infografia.get('/noticia/:idnoticia', controller.infografiaController.getInfografiasByNoticia);
        this.infografia.post('/', auth, controller.infografiaController.create);
        this.infografia.post('/audio', auth, controller.infografiaController.upload_audio);
        this.infografia.post('/video', auth, controller.infografiaController.upload_video);
        this.infografia.post('/images', auth, controller.infografiaController.upload_imagen);
        this.infografia.put('/:id', auth, controller.infografiaController.update);
        this.infografia.delete('/:id', auth, controller.infografiaController.delete);
    }
}
module.exports = new Infografia().infografia;