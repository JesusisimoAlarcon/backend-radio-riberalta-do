const bcrypt = require('bcryptjs');
async function actualizar_contrasena(password, usuario) {
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    const resp = await pool.query('UPDATE usuario SET ? WHERE idusuario = ?', [usuario, usuario.idusuario]);
    return resp;
}
module.exports = actualizar_contrasena;