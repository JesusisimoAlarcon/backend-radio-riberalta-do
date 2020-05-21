const pool = require('../database');
class PublicidadController {

    async list(req, res) {
        res.json(await pool.query('SELECT * FROM publicidad'));
    }

    async getOne(req, res) {
        res.json(await pool.query('SELECT * FROM publicidad where idpublicidad = ?', [req.params.id]));
    }

    async create(req, res) {
        res.json(await pool.query('INSERT INTO publicidad SET ?', [req.body]));
    }

    async update(req, res) {
        res.json(await pool.query('UPDATE publicidad SET ? WHERE idpublicidad = ?', [req.body, req.params.id]));
    }

    async delete(req, res) {
        res.json(await pool.query('DELETE FROM publicidad WHERE idpublicidad = ?', [req.params.id]));
    }
}
exports.publicidadController = new PublicidadController();
