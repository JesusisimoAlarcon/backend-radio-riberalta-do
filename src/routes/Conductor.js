const express = require('express');
const controller = require('../controllers/ConductorController');
//const upload = require('../libs/storages');
const auth = require('../libs/auth');
class Conductor {

    constructor() {
        this.conductor = express.Router();
        this.config();
    }

    config() {
        this.conductor.get('/', controller.conductorController.list);
        this.conductor.get('/:id', controller.conductorController.getOne);
        this.conductor.post('/', auth, controller.conductorController.create);
        this.conductor.post('/fotografia', auth, controller.conductorController.upload_fotografia);
        this.conductor.put('/:id', auth, controller.conductorController.update);
        this.conductor.delete('/:id', auth, controller.conductorController.delete);
    }
}
module.exports = new Conductor().conductor;