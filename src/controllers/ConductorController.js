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

    async getOneUser(req, res) {
        res.json(await pool.query('SELECT c.*, u.idusuario, u.username FROM conductor c inner join usuario u on c.idconductor = u.idconductor where c.idconductor = ?', [req.params.id]));
    }

    async create(req, res) {
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
    }

    async update(req, res) {
        res.json(await pool.query('UPDATE conductor SET ? WHERE idconductor = ?', [req.body, req.params.id]));
    }

    async delete(req, res) {
        res.json(await pool.query('DELETE FROM conductor WHERE idconductor = ?', [req.params.id]));
    }
}
exports.conductorController = new ConductorController();
