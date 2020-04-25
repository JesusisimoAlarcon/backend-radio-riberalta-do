const pool = require('../database');
const path = require('path')
class InfografiaController {

    async list(req, res) {
        res.json(await pool.query('SELECT * FROM infografia'));
    }

    async getOne(req, res) {
        res.json(await pool.query('SELECT * FROM infografia where idinfografia = ?', [req.params.id]));
    }
    
    async getInfografiasByNoticia(req, res) {
        res.json(await pool.query('SELECT * FROM infografia where idnoticia = ?', [req.params.idnoticia]));
    }
    

    async upload_imagen(req, res) {
        console.log(req.files.imagen);
        const archivo = req.files.imagen;
        const ruta_base = path.resolve('public', 'images')
        const name = Date.now() + path.extname(archivo.name).toLowerCase();
        const ruta = path.join(ruta_base, name);
        archivo.mv(ruta, err => {
            if (err)
                res.status(500).json({ message: err })
            else {
                res.status(200).json({ recurso: name, name: archivo.name });
            }
        });
    }

    async upload_audio(req, res) {
        console.log(req.files.audio);

        const archivo = req.files.audio;
        const ruta_base = path.resolve('public', 'audios')
        const name = Date.now() + path.extname(archivo.name).toLowerCase();
        const ruta = path.join(ruta_base, name);
        archivo.mv(ruta, err => {
            if (err)
                res.status(500).json({ message: err })
            else {
                res.status(200).json({ recurso: name, name: archivo.name });
            }
        });
    }


    async upload_video(req, res) {
        console.log(req.files.video);
        const archivo = req.files.video;
        const ruta_base = path.resolve('public', 'videos')
        const name = Date.now() + path.extname(archivo.name).toLowerCase();
        const ruta = path.join(ruta_base, name);
        archivo.mv(ruta, err => {
            if (err)
                res.status(500).json({ message: err })
            else {
                res.status(200).json({ recurso: name, name: archivo.name });
            }
        });
    }

    async create(req, res) {
        res.json(await pool.query('INSERT INTO infografia SET ?', [req.body]));
    }

    async update(req, res) {
        res.json(await pool.query('UPDATE infografia SET ? WHERE idinfografia = ?', [req.body, req.params.id]));
    }

    async delete(req, res) {
        res.json(await pool.query('DELETE FROM infografia WHERE idinfografia = ?', [req.params.id]));
    }
}
exports.infografiaController = new InfografiaController();
