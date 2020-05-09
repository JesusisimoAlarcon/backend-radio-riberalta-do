const pool = require('../database');
const path = require('path');
const upload = require('../libs/upload_archivo');
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
        res.json(await pool.query('SELECT * FROM noticia n inner join seccion s on n.idseccion = s.idseccion inner join conductor c on n.idconductor = c.idconductor where c.idconductor = ? order by fecha desc', [req.params.id]));
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
        const noticia = JSON.parse(req.body.noticia);
        const archivo = req.files.portada;
        const name = await upload(archivo, 'portada');
        noticia.portada = name;
        const newnoticia = await pool.query('INSERT INTO noticia SET ?', [noticia]);
        const idnoticia = newnoticia.insertId;
        const tipoinfografia = req.body.tipoinfografia;
        const urlinfografia = req.body.urlinfografia;
        let recurso = req.files.recurso;
        let name_recurso = '';
        if (!urlinfografia && tipoinfografia !== 'image' && recurso) {
            name_recurso = upload(recurso, tipoinfografia);
        } else if (tipoinfografia === 'image') {
            await req.files.recurso.map(async (recursito) => {
                const nameitem = upload(recursito, tipoinfografia);
                const infografia = {
                    tipo: tipoinfografia,
                    infografia: nameitem,
                    infotitulo: recursito.name,
                    infopie: recursito.size,
                    idnoticia: idnoticia
                }
                const newinfografia = await pool.query('INSERT INTO infografia SET ?', [infografia]);
                console.log(newinfografia);
            });

        }
        if (tipoinfografia !== 'image' && recurso) {
            const infografia = {
                tipo: urlinfografia ? 'video_url' : tipoinfografia,
                infografia: urlinfografia ? urlinfografia : name_recurso,
                infotitulo: tipoinfografia === 'image' ? infotitulo : recurso ? recurso.name : '',
                infopie: tipoinfografia === 'image' ? infopie : recurso ? recurso.size + '' : '',
                idnoticia: idnoticia
            }
            const newinfografia = await pool.query('INSERT INTO infografia SET ?', [infografia]);
            console.log(newinfografia);
        }
        res.status(200).end().json({ ok: true });
    }
    /*
    async create(req, res) {
        console.log(req.files.imagen);
        console.log(req.body.noticia);
        const noticia = JSON.parse(req.body.noticia);
        const archivo = req.files.imagen;
        const ruta_base = path.resolve('public', 'portadas');
        const name = Date.now() + path.extname(archivo.name).toLowerCase();
        const ruta = path.join(ruta_base, name);
        console.log(ruta_base)
        console.log(ruta)
        console.log(name)
        archivo.mv(ruta, async (err) => {
            if (err)
                res.status(500).json({ message: err })
            else {
                noticia.portada = name;
                console.log(noticia);
                res.json(await pool.query('INSERT INTO noticia SET ?', [noticia]));
            }
        });
    }
    */
    async update(req, res) {
        res.json(await pool.query('UPDATE noticia SET ? WHERE idnoticia = ?', [req.body, req.params.id]));
    }

    async delete(req, res) {
        res.json(await pool.query('DELETE FROM noticia WHERE idnoticia = ?', [req.params.id]));
    }
}
exports.noticiaController = new NoticiaController();
