const jwt = require('jsonwebtoken');
function verifiqueToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.json({
            auth: false,
            message: 'No se ha provisto un token'
        });
    }
    try {
        const decode = jwt.verify(token, process.env.SECRET);
        req.user = decode.user;
        next();
    } catch (error) {
        //console.log(error.message)
        return res.json({
            auth: false,
            message: error.message
        });
    }

}
module.exports = verifiqueToken;