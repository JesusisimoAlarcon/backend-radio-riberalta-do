const express = require('express');
const controller = require('../controllers/UsuarioController');
const auth = require('../libs/auth');
class Usuario {

    constructor() {
        this.usuario = express.Router();
        this.config();
    }

    config() {
        this.usuario.get('/:username/:password', controller.usuarioController.listByUsernamePassword);
        this.usuario.get('/me', auth, controller.usuarioController.me);
        this.usuario.get('/', auth, controller.usuarioController.list);
        this.usuario.get('/:id', auth, controller.usuarioController.getOne);
        this.usuario.post('/', auth, controller.usuarioController.create);
        this.usuario.put('/:id', auth, controller.usuarioController.update);
        this.usuario.delete('/:id', auth, controller.usuarioController.delete);
    }
}
module.exports = new Usuario().usuario;