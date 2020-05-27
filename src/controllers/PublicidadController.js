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
        const registro = JSON.parse(req.body.publicidad);
        if (registro.tipo === 'image')
            registro.publicidad = upload(req.files.imagen, 'publicidad');
        console.log(registro)
        res.json(await pool.query('INSERT INTO publicidad SET ?', [registro]));
    }

    async update(req, res) {
        res.json(await pool.query('UPDATE publicidad SET ? WHERE idpublicidad = ?', [req.body, req.params.id]));
    }

    async delete(req, res) {
        res.json(await pool.query('DELETE FROM publicidad WHERE idpublicidad = ?', [req.params.id]));
    }
}
exports.publicidadController = new PublicidadController();
