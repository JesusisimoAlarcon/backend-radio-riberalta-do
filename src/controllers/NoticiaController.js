const pool = require('../database');
const path = require('path')
class NoticiaController {

    async list(req, res) {
        res.json(await pool.query('SELECT * FROM noticia'));
    }

    async listDetalle(req, res) {
        res.json(await pool.query('SELECT * FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor order by fecha desc'));
    }

    async listDetalleBySeccion(req, res) {
        res.json(await pool.query('SELECT * FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor where seccion = ? order by fecha desc', [req.params.seccion]));
    }

    async getOne(req, res) {
        const noticias = await pool.query('SELECT * FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor where idnoticia = ?', [req.params.id])
        res.json(noticias);
    }

    async create(req, res) {
        console.log(req.body)
        res.json(await pool.query('INSERT INTO noticia SET ?', [req.body]));
    }

    async upload_portada(req, res) {
        console.log(req.files.imagen);

        const archivo = req.files.imagen;
        const ruta_base = path.resolve('public', 'portadas')
        const name = Date.now() + path.extname(archivo.name).toLowerCase();
        const ruta = path.join(ruta_base, name);
        archivo.mv(ruta, err => {
            if (err)
                res.status(500).json({ message: err })
            else {
                res.status(200).json({ imagen: name });
            }
        });
    }

    async update(req, res) {
        res.json(await pool.query('UPDATE noticia SET ? WHERE idnoticia = ?', [req.body, req.params.id]));
    }

    async delete(req, res) {
        res.json(await pool.query('DELETE FROM noticia WHERE idnoticia = ?', [req.params.id]));
    }
}
exports.noticiaController = new NoticiaController();
