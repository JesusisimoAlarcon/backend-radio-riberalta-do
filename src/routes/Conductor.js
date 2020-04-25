const express = require('express');
const controller = require('../controllers/ConductorController');
const upload = require('../libs/storages')
class Conductor {

    constructor() {
        this.conductor = express.Router();
        this.config();
    }

    config() {
        this.conductor.get('/', controller.conductorController.list);
        this.conductor.get('/:id', controller.conductorController.getOne);
        this.conductor.post('/', controller.conductorController.create);
        this.conductor.post('/fotografia', controller.conductorController.upload_fotografia);
        this.conductor.put('/:id', controller.conductorController.update);
        this.conductor.delete('/:id', controller.conductorController.delete);
    }
}
module.exports = new Conductor().conductor;