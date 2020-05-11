const pool = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class UsuarioController {

    async me(req, res) {
        const user = req.user;
        res.json({ user });
    }

    async list(req, res) {
        res.json(await pool.query('SELECT idusuario, username, rol, nombres, apellidos, fotografia, estado FROM usuario u inner join conductor c on u.idconductor = c.idconductor'));
    }

    async listByUsernamePassword(req, res) {
        const user = (await pool.query('SELECT idusuario, c.idconductor, rol, nombres, apellidos, correo, fotografia, estado, password FROM usuario u inner join conductor c on u.idconductor = c.idconductor WHERE username = ?', [req.params.username]))[0];
        if (!user)
            return res.json({ auth: false, message: "El usuario no existe" })

        if (!await bcrypt.compare(req.params.password, user.password))
            return res.json({ auth: false, message: "Contraseña incorrecta, revice sus credenciales" })

        delete user.password;
        const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: 60 * 60 * 24 })
        res.status(200).json({ auth: true, message: "Usuario autenticado de forma correcta :)", token })
    }

    async getOne(req, res) {
        res.json(await pool.query('SELECT * FROM usuario where idusuario = ?', [req.params.id]));
    }

    async create(req, res) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        res.json(await pool.query('INSERT INTO usuario SET ?', [req.body]));
    }

    async update(req, res) {
        res.json(await pool.query('UPDATE usuario SET ? WHERE idusuario = ?', [req.body, req.params.id]));
    }

    async delete(req, res) {
        res.json(await pool.query('DELETE FROM usuario WHERE idusuario = ?', [req.params.id]));
    }
}
exports.usuarioController = new UsuarioController();
