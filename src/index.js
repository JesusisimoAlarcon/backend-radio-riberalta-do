const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')
const fileupload = require('express-fileupload');
//const bodyparser = require('body-parser')
require('dotenv').config();
class Servidor {

    constructor() {
        this.app = express();
        this.configuracion();
        this.middlewares();
        this.rutas();
        this.publico();
        this.iniciarServidor();
    }

    configuracion() {
        this.app.set('port', process.env.PORT || 4500);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        //this.app.use(bodyparser.urlencoded({ extended: false }))
        //this.app.use(bodyparser.json())
        this.app.use(fileupload());
        this.app.use(cors());
    }

    variables_globales() {

    }

    publico() {
        this.app.use('/api/static', express.static(path.resolve('public')));
        //this.app.use('/static', express.static(path.join(__dirname, 'public')));
    }

    rutas() {

        this.app.use('/api/seccion', require('./routes/Seccion'));
        this.app.use('/api/conductor', require('./routes/Conductor'));
        this.app.use('/api/programa', require('./routes/Programa'));
        this.app.use('/api/genero', require('./routes/Genero'));
        this.app.use('/api/configuracion', require('./routes/Configuracion'));
        this.app.use('/api/noticia', require('./routes/Noticia'));
        this.app.use('/api/infografia', require('./routes/Infografia'));
        this.app.use('/api/programacion', require('./routes/Programacion'));
    }

    iniciarServidor() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Servidor corriendo en el puerto ${this.app.get('port')}`);
        });
    }

}
new Servidor();