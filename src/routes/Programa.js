const express = require('express');
const controller = require('../controllers/ProgramaController');
const auth = require('../libs/auth');
class Programa {

    constructor() {
        this.programa = express.Router();
        this.config();
    }

    config() {
        this.programa.get('/detalle', auth, controller.programaController.listdetalle);
        this.programa.get('/', auth, controller.programaController.list);
        this.programa.get('/:id', auth, controller.programaController.getOne);
        this.programa.post('/', auth, controller.programaController.create);
        this.programa.put('/:id', auth, controller.programaController.update);
        this.programa.delete('/:id', auth, controller.programaController.delete);
    }
}
module.exports = new Programa().programa;