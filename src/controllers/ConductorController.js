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
        console.log(req.body.conductor);
        const conductor = JSON.parse(req.body.conductor);


        const archivo = req.files.imagen[0];
        const ruta_base = path.resolve('public', 'perfiles');
        console.log(ruta_base);
        console.log(archivo.name)

        
        const name = Date.now() + path.extname(archivo.name).toLowerCase();
        const ruta = path.join(ruta_base, name);
        archivo.mv(ruta, async (err) => {
            if (err)
                res.status(500).json({ message: err })
            else {
                //res.status(200).json({ imagen: name });
                conductor.fotografia = name;
                console.log(conductor);
                res.json(await pool.query('INSERT INTO conductor SET ?', [conductor]));
            }
        });

    }


    async create(req, res) {
        console.log(req.body);

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
