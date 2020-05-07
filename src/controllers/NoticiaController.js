const pool = require('../database');
const path = require('path')
class NoticiaController {

    async list(req, res) {
        res.json(await pool.query('SELECT * FROM noticia order by fecha desc'));
    }

    async listDetalle(req, res) {
        res.json(await pool.query('SELECT * FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor order by fecha desc'));
    }

    async listRelacionadas(req, res) {
        //let sql = `SELECT idnoticia, portada, pieportada, titulo, seccion, tipo, fecha FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor where idnoticia <> '${req.params.id}' and (`
        let sql = `SELECT * FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor where idnoticia <> '${req.params.id}' and (`
        req.params.etiquetas.split(',').map((eti, index) => {
            if (index > 0)
                sql += `or`
            sql += ` contenido like '%${eti}%' `
        })
        sql += ') order by fecha desc, prioridad desc limit 0,4'
        //res.json(sql)
        res.json(await pool.query(sql));
    }

    async listDetalleByAutor(req, res) {
        res.json(await pool.query('SELECT * FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor where c.idconductor = ? order by fecha desc', [req.params.autor]));
    }

    async listDetalleBySeccion(req, res) {
        res.json(await pool.query('SELECT * FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor where seccion = ? order by fecha desc', [req.params.seccion]));
    }

    async listDetalleByBusqueda(req, res) {
        console.log(req.params.busqueda)
        res.json(await pool.query(`SELECT * FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor where contenido like '%${req.params.busqueda}%' order by fecha desc`));
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
