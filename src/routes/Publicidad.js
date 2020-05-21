const express = require('express');
const controller = require('../controllers/PublicidadController');
const auth = require('../libs/auth');
class Publicidad {

    constructor() {
        this.publicidad = express.Router();
        this.config();
    }

    config() {
        this.publicidad.get('/', controller.publicidadController.list);
        this.publicidad.get('/:id', controller.publicidadController.getOne);
        this.publicidad.post('/', auth, controller.publicidadController.create);
        this.publicidad.put('/:id', auth, controller.publicidadController.update);
        this.publicidad.delete('/:id', auth, controller.publicidadController.delete);
    }
}
module.exports = new Publicidad().publicidad;