const pool = require('../database');
class ProgramaController {

    async list(req, res) {
        res.json(await pool.query('SELECT * FROM programa'));
    }

    async listdetalle(req, res) {
        /*
        const programas = await pool.query('SELECT * FROM programa p inner join genero g on p.idgenero=g.idgenero')
        const resp = {
            data: programas
        }
        res.json(resp);
        */
        res.json(await pool.query('SELECT * FROM programa p inner join genero g on p.idgenero=g.idgenero'));
        
    }

    async getOne(req, res) {
        res.json(await pool.query('SELECT * FROM programa where idprograma = ?', [req.params.id]));
    }

    async create(req, res) {
        res.json(await pool.query('INSERT INTO programa SET ?', [req.body]));
    }

    async update(req, res) {
        res.json(await pool.query('UPDATE programa SET ? WHERE idprograma = ?', [req.body, req.params.id]));
    }

    async delete(req, res) {
        res.json(await pool.query('DELETE FROM programa WHERE idprograma = ?', [req.params.id]));
    }
}
exports.programaController = new ProgramaController();
