const express = require('express');
const controller = require('../controllers/ProgramacionController');
const auth = require('../libs/auth');
class Programacion {

    constructor() {
        this.programacion = express.Router();
        this.config();
    }

    config() {
        this.programacion.get('/', controller.programacionController.list);
        this.programacion.get('/detalle', controller.programacionController.listDetalle);
        this.programacion.get('/:id', controller.programacionController.getOne);
        this.programacion.post('/', auth, controller.programacionController.create);
        this.programacion.put('/:id', auth, controller.programacionController.update);
        this.programacion.delete('/:id', auth, controller.programacionController.delete);
    }
}
module.exports = new Programacion().programacion;