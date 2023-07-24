const { validateToken } = require("../services/userServices");

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-authorization'];
    if(token){
        try {
            const user = validateToken(token);
            req.user = {
                'email': user.email,
                '_id': user._id,
                token
            }
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