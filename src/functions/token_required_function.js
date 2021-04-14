function token_required(req, res, next) {
    const bearer_header = req.headers.authorization
    console.log(bearer_header)
    if (typeof bearer_header !== 'undefined') {
        const bearer = bearer_header.split(' ')
        const token = bearer[1]
        req.token = token
        next()
    } else {
        res.status(403).json({message: "El usuario no ha iniciado sesión."})
    }
}

module.exports = token_required