const { validateToken } = require("../services/userServices");

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-authorization'];
    if(token){
        try {
            const payload = validateToken(token);
              req.user = payload
              req.token = token

        } catch (error) {
            res.json(error)
            console.log(error)
        }
    }
    next();
}

module.exports = {
    authMiddleware
}