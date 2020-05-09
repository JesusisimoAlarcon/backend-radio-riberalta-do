const path = require('path')
async function almacenar_archivos(archivo, ruta_destino) {
    console.log(archivo);
    const ruta_base = path.resolve('public', ruta_destino);
    console.log(ruta_base)
    console.log(archivo.name)
    const name = Date.now() + path.extname(archivo.name).toLowerCase();
    const ruta = path.join(ruta_base, name);
    console.log(name);
    await archivo.mv(ruta);
    return name;
}
module.exports = almacenar_archivos;