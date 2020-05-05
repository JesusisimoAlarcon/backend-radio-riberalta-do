const express = require('express');
const controller = require('../controllers/ConfiguracionController');
const auth = require('../libs/auth');
class Configuracion {

    constructor() {
        this.configuracion = express.Router();
        this.config();
    }

    config() {
        this.configuracion.get('/', auth, controller.configuracionController.getOne);
        this.configuracion.put('/:id', auth, controller.configuracionController.update);

    }
}
module.exports = new Configuracion().configuracion;