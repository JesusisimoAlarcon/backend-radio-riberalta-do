const pool = require('../database');
class SeccionController {

    async list(req, res) {
        res.json(await pool.query('SELECT * FROM seccion'));
    }

    async listNavItem(req, res) {
        const list = await pool.query('SELECT * FROM seccion')
        const navs = [];
        list.map(item => {
            const nav = {
                id: item.idseccion,
                icon: item.icono,
                label: item.seccion,
                to: '#/noticias/' + item.seccion.toLowerCase()
            }
            navs.push(nav);
        })
        res.json(navs);
    }

    async getOne(req, res) {
        res.json(await pool.query('SELECT * FROM seccion where idseccion = ?', [req.params.id]));
    }

    async create(req, res) {
        res.json(await pool.query('INSERT INTO seccion SET ?', [req.body]));
    }

    async update(req, res) {
        res.json(await pool.query('UPDATE seccion SET ? WHERE idseccion = ?', [req.body, req.params.id]));
    }

    async delete(req, res) {
        res.json(await pool.query('DELETE FROM seccion WHERE idseccion = ?', [req.params.id]));
    }
}
exports.seccionController = new SeccionController();
