const express = require('express');
const controller = require('../controllers/NoticiaController');
class Noticia {

    constructor() {
        this.noticia = express.Router();
        this.config();
    }

    config() {
        this.noticia.get('/', controller.noticiaController.list);
        this.noticia.get('/detalle', controller.noticiaController.listDetalle);
        this.noticia.get('/detalle/:seccion', controller.noticiaController.listDetalleBySeccion);
        this.noticia.get('/:id', controller.noticiaController.getOne);
        this.noticia.post('/', controller.noticiaController.create);
        this.noticia.post('/portada', controller.noticiaController.upload_portada);
        this.noticia.put('/:id', controller.noticiaController.update);
        this.noticia.delete('/:id', controller.noticiaController.delete);
    }
}
module.exports = new Noticia().noticia;