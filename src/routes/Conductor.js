const express = require('express');
const controller = require('../controllers/ConductorController');
const auth = require('../libs/auth');
class Conductor {

    constructor() {
        this.conductor = express.Router();
        this.config();
    }

    config() {
        this.conductor.get('/', controller.conductorController.list);
        this.conductor.get('/:id', controller.conductorController.getOne);
        this.conductor.get('/user/:id', controller.conductorController.getOneUser);
        this.conductor.post('/dump', auth, controller.conductorController.create);
        this.conductor.put('/:id', auth, controller.conductorController.update);
        this.conductor.delete('/:id', auth, controller.conductorController.delete);
    }
}
module.exports = new Conductor().conductor;