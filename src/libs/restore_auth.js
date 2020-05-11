const pool = require('../database');
const bcrypt = require('bcryptjs');
function actualizar_contrasena(password, usuario) {
    console.log('iniciando')
    const salt = bcrypt.genSalt(10);
    console.log(salt)
    usuario.password = bcrypt.hash(password, salt);
    console.log(usuario)
    const resp = pool.query('UPDATE usuario SET ? WHERE idusuario = ?', [usuario, usuario.idusuario]);
    console.log('finalizando')
    return resp;
}
module.exports = actualizar_contrasena;