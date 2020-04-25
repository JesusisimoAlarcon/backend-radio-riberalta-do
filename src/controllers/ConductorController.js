const pool = require('../database');
const path = require('path')
const bcrypt = require('bcryptjs')
class ConductorController {

    async list(req, res) {
        res.json(await pool.query('SELECT * FROM conductor'));
    }

    async getOne(req, res) {
        res.json(await pool.query('SELECT * FROM conductor where idconductor = ?', [req.params.id]));
    }


    async upload_fotografia(req, res) {
        console.log(req.files.imagen);

        const archivo = req.files.imagen;
        const ruta_base = path.resolve('public', 'perfiles')
        const name = Date.now() + path.extname(archivo.name).toLowerCase();
        const ruta = path.join(ruta_base, name);
        archivo.mv(ruta, err => {
            if (err)
                res.status(500).json({ message: err })
            else {
                res.status(200).json({ imagen: name });
            }
        });
    }

    async create(req, res) {
        console.log(req.body)

        res.json(await pool.query('INSERT INTO conductor SET ?', [req.body]));
    }

    async update(req, res) {
        res.json(await pool.query('UPDATE conductor SET ? WHERE idconductor = ?', [req.body, req.params.id]));
    }

    async delete(req, res) {
        res.json(await pool.query('DELETE FROM conductor WHERE idconductor = ?', [req.params.id]));
    }
}
exports.conductorController = new ConductorController();
