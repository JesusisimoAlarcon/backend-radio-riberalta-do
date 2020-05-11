const pool = require('../database');
const path = require('path');
const bcrypt = require('bcryptjs');
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
        console.log(req.body.conductor);
        const conductor = JSON.parse(req.body.conductor);
        console.log(req.files)
        if (req.files) {
            console.log(req.files.imagen);
            const archivo = req.files.imagen;
            const perfil = upload(archivo, 'perfiles');
            conductor.fotografia = perfil;
        }
        console.log(req.body)
        console.log(conductor)
        console.log(req.body.user_update)
        if (req.body.user_update === 'true') {
            console.log('si')
        }
        else {
            console.log('no')
        }
        if (req.body.user_update === 'true') {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);
            const resp1 = await pool.query('UPDATE usuario SET ? WHERE idusuario = ?', [{ username: conductor.username, password }, conductor.idusuario]);
            console.log(resp1)
            delete conductor.idusuario;
            delete conductor.username;
        }
        console.log(conductor)
        console.log(req.params.id)
        await pool.query('UPDATE conductor SET ? WHERE idconductor = ?', [conductor, req.params.id])
        res.json({ ok: true });
    }

    async delete(req, res) {
        res.json(await pool.query('DELETE FROM conductor WHERE idconductor = ?', [req.params.id]));
    }
}
exports.conductorController = new ConductorController();
