const express = require('express');
const controller = require('../controllers/ConfiguracionController');
class Configuracion {

    constructor() {
        this.configuracion = express.Router();
        this.config();
    }

    config() {
        this.configuracion.get('/', controller.configuracionController.getOne);
        this.configuracion.put('/:id', controller.configuracionController.update);
        
    }
}
module.exports = new Configuracion().configuracion;