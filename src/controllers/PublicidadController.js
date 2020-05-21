const pool = require('../database');
const upload = require('../libs/upload_archivo');
class PublicidadController {

    async list(req, res) {
        res.json(await pool.query('SELECT * FROM publicidad'));
    }

    async getOne(req, res) {
        res.json(await pool.query('SELECT * FROM publicidad where idpublicidad = ?', [req.params.id]));
    }

    async create(req, res) {
        console.log(req.body.publicidad);
        const publicidad = JSON.parse(req.body.publicidad);
        console.log(req.files)
        console.log(req.files.imagen);
        const archivo = req.files.imagen;
        const name = upload(archivo, 'publicidad');
        publicidad.publicidad = name;
        res.json(await pool.query('INSERT INTO publicidad SET ?', [publicidad]));
    }

    async update(req, res) {
        res.json(await pool.query('UPDATE publicidad SET ? WHERE idpublicidad = ?', [req.body, req.params.id]));
    }

    async delete(req, res) {
        res.json(await pool.query('DELETE FROM publicidad WHERE idpublicidad = ?', [req.params.id]));
    }
}
exports.publicidadController = new PublicidadController();
