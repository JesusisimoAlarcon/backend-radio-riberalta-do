const express = require('express');
const controller = require('../controllers/NoticiaController');
const auth = require('../libs/auth');
class Noticia {

    constructor() {
        this.noticia = express.Router();
        this.config();
    }

    config() {
        this.noticia.get('/', controller.noticiaController.list);
        this.noticia.get('/search/:busqueda', controller.noticiaController.listDetalleByBusqueda);
        this.noticia.get('/relacionadas/:id/:etiquetas', controller.noticiaController.listRelacionadas);
        this.noticia.get('/detalle', controller.noticiaController.listDetalle);
        this.noticia.get('/detalle/:seccion', controller.noticiaController.listDetalleBySeccion);
        this.noticia.get('/autor/autor/:id', controller.noticiaController.listDetalleByAutor);
        this.noticia.get('/:id', controller.noticiaController.getOne);
        this.noticia.post('/', auth, controller.noticiaController.create);
        this.noticia.post('/portada', auth, controller.noticiaController.upload_portada);
        this.noticia.put('/:id', auth, controller.noticiaController.update);
        this.noticia.delete('/:id', auth, controller.noticiaController.delete);
    }
}
module.exports = new Noticia().noticia;