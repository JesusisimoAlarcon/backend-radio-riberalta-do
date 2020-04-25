const pool = require('../database');
class ProgramacionController {

    async list(req, res) {
        res.json(await pool.query('SELECT * FROM programacion order by horainicio asc'));
    }

    async listDetalle(req, res) {
        res.json(await pool.query('SELECT * FROM programacion p inner join programa g on p.idprograma = g.idprograma inner join genero e on g.idgenero = e.idgenero inner join conductor c on p.idconductor = c.idconductor order by estado desc, horainicio asc'));
    }

    async getOne(req, res) {
        res.json(await pool.query('SELECT * FROM programacion where idprogramacion = ?', [req.params.id]));
    }

    async create(req, res) {
        res.json(await pool.query('INSERT INTO programacion SET ?', [req.body]));
    }

    async update(req, res) {
        res.json(await pool.query('UPDATE programacion SET ? WHERE idprogramacion = ?', [req.body, req.params.id]));
    }

    async delete(req, res) {
        res.json(await pool.query('DELETE FROM programacion WHERE idprogramacion = ?', [req.params.id]));
    }
}
exports.programacionController = new ProgramacionController();
