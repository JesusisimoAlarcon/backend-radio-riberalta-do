const pool = require('../database');
const path = require('path');
const upload = require('../libs/upload_archivo');
class NoticiaController {

    async list(req, res) {
        res.json(await pool.query('SELECT * FROM noticia order by fecha desc'));
    }

    async listDetalle(req, res) {
        res.json(await pool.query('SELECT n.idnoticia, n.portada, n.titulo, n.subtitulo, s.seccion, n.tipo, n.fecha FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor order by fecha desc'));
    }

    async listDetalleByLimit(req, res) {
        const resp = await pool.query('SELECT n.idnoticia, n.portada, n.titulo, n.subtitulo, s.seccion, n.tipo, n.fecha FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor order by fecha desc limit ?, ?', [((req.query.page - 1) * req.query.limit), (Number)(req.query.limit)])
        res.json(resp);
    }

    async listDetalleSeccionByLimit(req, res) {
        const resp = await pool.query(`SELECT n.idnoticia, n.portada, n.titulo, n.subtitulo, s.seccion, n.tipo, n.fecha FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor where s.seccion like '%${req.query.seccion}%' order by fecha desc limit ?, ?`, [((req.query.page - 1) * req.query.limit), (Number)(req.query.limit)])
        res.json(resp);
    }

    async listRelacionadas(req, res) {
        //let sql = `SELECT idnoticia, portada, pieportada, titulo, seccion, tipo, fecha FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor where idnoticia <> '${req.params.id}' and (`
        let sql = `SELECT n.idnoticia, n.portada, n.titulo, n.subtitulo, s.seccion, n.tipo, n.fecha FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor where idnoticia <> '${req.params.id}' and (`
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
        res.json(await pool.query('SELECT * FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor where c.idconductor = ? order by fecha desc', [req.params.id]));
    }

    async listDetalleBySeccion(req, res) {
        res.json(await pool.query('SELECT n.idnoticia, n.portada, n.titulo, n.subtitulo, s.seccion, n.tipo, n.fecha FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor where seccion = ? order by fecha desc', [req.params.seccion]));
    }

    async listDetalleByBusqueda(req, res) {
        console.log(req.params.busqueda)
        res.json(await pool.query(`SELECT n.idnoticia, n.portada, n.titulo, n.subtitulo, s.seccion, n.tipo, n.fecha FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor where contenido like '%${req.params.busqueda}%' order by fecha desc`));
    }

    async getOne(req, res) {
        const noticias = await pool.query('SELECT * FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor where idnoticia = ?', [req.params.id])
        res.json(noticias);
    }

    async create(req, res) {
        const noticia = JSON.parse(req.body.noticia);
        const archivo = req.files.portada;
        const recurso = req.files.recurso;
        const tipoinfografia = req.body.tipoinfografia;
        const urlinfografia = req.body.urlinfografia;
        const portada = upload(archivo, 'portada');
        noticia.portada = portada;
        noticia.infotipo = urlinfografia ? 'video_url' : tipoinfografia;
        console.log('inicio de la subida')
        let name = '';
        let titulo = '';
        let sizes = '';
        if (Array.isArray(recurso)) {
            recurso.forEach(recursito => {
                name = name + upload(recursito, tipoinfografia) + ',';
                titulo = titulo + recursito.name + ',';
                sizes = sizes + recursito.size + ',';
            })
        }
        else if (recurso && (tipoinfografia !== 'nota' || !urlinfografia)) {
            name = upload(recurso, tipoinfografia);
            titulo = recurso.name;
            sizes = recurso.size;
        }
        noticia.infografia = recurso ? name : urlinfografia;
        noticia.infonombre = titulo;
        noticia.infosize = sizes;
        console.log(noticia);
        const newnoticia = await pool.query('INSERT INTO noticia SET ?', [noticia]);
        console.log('finalice la subida')
        await res.json({ ok: true, newnoticia })
    }

    async update(req, res) {
        res.json(await pool.query('UPDATE noticia SET ? WHERE idnoticia = ?', [req.body, req.params.id]));
    }

    async delete(req, res) {
        res.json(await pool.query('DELETE FROM noticia WHERE idnoticia = ?', [req.params.id]));
    }
}
exports.noticiaController = new NoticiaController();
