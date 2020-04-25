const pool = require('../database');
class ConfiguracionController {

    async getOne(req, res) {
        res.json(await pool.query('SELECT * FROM configuracion where idconfiguracion = 1'));
    }

    async update(req, res) {
        res.json(await pool.query('UPDATE configuracion SET ? WHERE idconfiguracion = ?', [req.body, req.params.id]));
    }
}
exports.configuracionController = new ConfiguracionController();
