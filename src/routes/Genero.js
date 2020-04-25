const express = require('express');
const controller = require('../controllers/GeneroController');
class Genero {

    constructor() {
        this.genero = express.Router();
        this.config();
    }

    config() {
        this.genero.get('/', controller.generoController.list);
        this.genero.get('/:id', controller.generoController.getOne);
        this.genero.post('/', controller.generoController.create);
        this.genero.put('/:id', controller.generoController.update);
        this.genero.delete('/:id', controller.generoController.delete);
    }
}
module.exports = new Genero().genero;