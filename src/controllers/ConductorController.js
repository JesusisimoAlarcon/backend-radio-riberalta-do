const pool = require('../database');
const path = require('path');
//const bcrypt = require('bcryptjs')
const upload = require('../libs/upload_archivo');
class ConductorController {

    async list(req, res) {
        res.json(await pool.query('SELECT * FROM conductor'));
    }

    async getOne(req, res) {
        res.json(await pool.query('SELECT * FROM conductor where idconductor = ?', [req.params.id]));
    }
    async create(req, res) {
        //console.log(req.files.imagen);
        console.log(req.body.conductor);
        const conductor = JSON.parse(req.body.conductor);
        let perfil = '';
        console.log(req.files)
        if (req.files) {
            console.log(req.files.imagen);
            const archivo = req.files.imagen;
            perfil = upload(archivo, 'perfiles');
        }
        conductor.fotografia = perfil;
        res.json(await pool.query('INSERT INTO conductor SET ?', [conductor]));
        /*
                const ruta_base = path.resolve('public', 'perfiles');
                const name = Date.now() + path.extname(archivo.name).toLowerCase();
                const ruta = path.join(ruta_base, name);
                archivo.mv(ruta, async (err) => {
                    if (err)
                        res.status(500).json({ message: err })
                    else {
                        conductor.fotografia = name;
                        console.log(conductor);
                        res.json(await pool.query('INSERT INTO conductor SET ?', [conductor]));
                    }
                });
        */
    }

    async update(req, res) {
        res.json(await pool.query('UPDATE conductor SET ? WHERE idconductor = ?', [req.body, req.params.id]));
    }

    async delete(req, res) {
        res.json(await pool.query('DELETE FROM conductor WHERE idconductor = ?', [req.params.id]));
    }
}
exports.conductorController = new ConductorController();
