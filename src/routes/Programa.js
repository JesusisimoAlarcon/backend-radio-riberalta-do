const express = require('express');
const controller = require('../controllers/ProgramaController');
class Programa {

    constructor() {
        this.programa = express.Router();
        this.config();
    }

    config() {
        this.programa.get('/detalle', controller.programaController.listdetalle);
        this.programa.get('/', controller.programaController.list);
        this.programa.get('/:id', controller.programaController.getOne);
        this.programa.post('/', controller.programaController.create);
        this.programa.put('/:id', controller.programaController.update);
        this.programa.delete('/:id', controller.programaController.delete);
    }
}
module.exports = new Programa().programa;