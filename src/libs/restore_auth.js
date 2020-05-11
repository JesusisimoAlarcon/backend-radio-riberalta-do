const pool = require('../database');
const bcrypt = require('bcryptjs');
async function actualizar_contrasena(password, usuario) {
    console.log('iniciando')
    const salt = await bcrypt.genSalt(10);
    console.log(salt)
    usuario.password = await bcrypt.hash(password, salt);
    console.log(usuario)
    const resp = await pool.query('UPDATE usuario SET ? WHERE idusuario = ?', [usuario, usuario.idusuario]);
    console.log('finalizando')
    return await resp;
}
module.exports = actualizar_contrasena;