const pool = require('../database');
class GeneroController {

    async list(req, res) {
        res.json(await pool.query('SELECT * FROM genero'));
    }

    async getOne(req, res) {
        res.json(await pool.query('SELECT * FROM genero where idgenero = ?', [req.params.id]));
    }

    async create(req, res) {
        res.json(await pool.query('INSERT INTO genero SET ?', [req.body]));
    }

    async update(req, res) {
        res.json(await pool.query('UPDATE genero SET ? WHERE idgenero = ?', [req.body, req.params.id]));
    }

    async delete(req, res) {
        res.json(await pool.query('DELETE FROM genero WHERE idgenero = ?', [req.params.id]));
    }
}
exports.generoController = new GeneroController();
