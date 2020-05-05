const express = require('express');
const controller = require('../controllers/GeneroController');
const auth = require('../libs/auth');
class Genero {

    constructor() {
        this.genero = express.Router();
        this.config();
    }

    config() {
        this.genero.get('/', controller.generoController.list);
        this.genero.get('/:id', controller.generoController.getOne);
        this.genero.post('/', auth, controller.generoController.create);
        this.genero.put('/:id', auth, controller.generoController.update);
        this.genero.delete('/:id', auth, controller.generoController.delete);
    }
}
module.exports = new Genero().genero;