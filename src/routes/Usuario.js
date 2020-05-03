const express = require('express');
const controller = require('../controllers/UsuarioController');
class Usuario {

    constructor() {
        this.usuario = express.Router();
        this.config();
    }

    config() {
        this.usuario.get('/', controller.usuarioController.list);
        this.usuario.get('/:username/:password', controller.usuarioController.listByUsernamePassword);
        this.usuario.get('/:id', controller.usuarioController.getOne);
        this.usuario.post('/', controller.usuarioController.create);
        this.usuario.put('/:id', controller.usuarioController.update);
        this.usuario.delete('/:id', controller.usuarioController.delete);
    }
}
module.exports = new Usuario().usuario;