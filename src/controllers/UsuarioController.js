const pool = require('../database');
class UsuarioController {

    async list(req, res) {
        res.json(await pool.query('SELECT * FROM usuario'));
    }

    async listByUsernamePassword(req, res) {
        res.json(await pool.query('SELECT * FROM usuario WHERE username = ? and password = ?', [req.params.username, req.params.password]));
    }

    async getOne(req, res) {
        res.json(await pool.query('SELECT * FROM usuario where idusuario = ?', [req.params.id]));
    }

    async create(req, res) {
        res.json(await pool.query('INSERT INTO usuario SET ?', [req.body]));
    }

    async update(req, res) {
        res.json(await pool.query('UPDATE usuario SET ? WHERE idusuario = ?', [req.body, req.params.id]));
    }

    async delete(req, res) {
        res.json(await pool.query('DELETE FROM usuario WHERE idusuario = ?', [req.params.id]));
    }
}
exports.usuarioController = new UsuarioController();
