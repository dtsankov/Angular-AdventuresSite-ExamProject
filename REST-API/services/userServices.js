const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const server = require('../environment')
const User = require('../models/User')

const validateToken = (token) => {
    try {
        const data = jwt.verify(token, server.SECRET_KEY)
        return data
    } catch (error) {
        throw new Error('Invalid access token!')
    }
}
const createAccessToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email
    }
    const accessToken = jwt.sign(payload, server.SECRET_KEY)
    return {
        email: user.email,
        accessToken,
        _id: user._id
    };
}
const register = async (email, password) => {
    const existingEmail = await User.findOne({ email })


    if (existingEmail) {
        const error = new Error('Email already exists!');
        error.status = 409;
        throw error;
    }

    const user = await User.create({ email, password })
    return createAccessToken(user)
}



const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password!')
    }
    const isUser = await bcrypt.compare(password, user.password)
    if (isUser) {
        return createAccessToken(user)
    } else {
        throw new Error('Invalid email or password!')
    }
}

const updateUserAdventures = async (_id, adventureId) => {
    try {
        const user = await User.findById(_id);
        let adventuresArr = user.adventures
        adventuresArr.push(adventureId)
        await User.findByIdAndUpdate(_id, { adventures: adventuresArr })
    } catch (error) {
        throw new Error(error)
    }
}

const logout = (token) => {
    blacklist.add(token)
}
module.exports = {
    login,
    register,
    createAccessToken,
    validateToken,
    updateUserAdventures,
    logout
}