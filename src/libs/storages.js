const multer = require('multer');
//require('../../public')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../public/fotos')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

//const upload = multer({ storage: storage })
module.exports = storage