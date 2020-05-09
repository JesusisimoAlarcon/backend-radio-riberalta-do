const path = require('path')
function almacenar_archivos(archivo, ruta_destino) {
    const ruta_base = path.resolve('public', ruta_destino);
    const name = Date.now() + path.extname(archivo.name).toLowerCase();
    const ruta = path.join(ruta_base, name);
    archivo.mv(ruta);
    return name;
}
module.exports = almacenar_archivos;