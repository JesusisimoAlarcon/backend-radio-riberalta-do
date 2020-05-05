const express = require('express');
const controller = require('../controllers/SeccionController');
const auth = require('../libs/auth');
class Seccion {

    constructor() {
        this.seccion = express.Router();
        this.config();
    }

    config() {
        this.seccion.get('/navs', controller.seccionController.listNavItem);

        this.seccion.get('/', controller.seccionController.list);
        this.seccion.get('/:id', controller.seccionController.getOne);
        this.seccion.post('/', auth, controller.seccionController.create);
        this.seccion.put('/:id', auth, controller.seccionController.update);
        this.seccion.delete('/:id', auth, controller.seccionController.delete);
    }
}
module.exports = new Seccion().seccion;