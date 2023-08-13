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
        username: user.username,
        email: user.email,
        img: user.img
    }
    const accessToken = jwt.sign(payload, server.SECRET_KEY)
    return {
        email: user.email,
        username: user.username,
        _id: user._id,
        img:user.img,
        accessToken,
    };
}
const register = async (username, email, password,img) => {
    const existingEmail = await User.findOne({ email })


    if (existingEmail) {
        const error = new Error('Email already exists!');
        error.status = 409;
        throw error;
    }

    const user = await User.create({username, email, password,img })
    return createAccessToken(user)
}



const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error('Invalid email or password!');
        error.status = 409;
        throw error;
    }

    const isUser = await bcrypt.compare(password, user.password)

    if (isUser) {
        return createAccessToken(user)
    } else {
        const error = new Error('Invalid email or password!');
        error.status = 409;
        throw error;
    }
}

const updateUserAdventures = async (id, adventureId) => {
    try {
        const user = await User.findById(id);
        let adventuresArr = user.adventures
        adventuresArr.push(adventureId)
        await User.findByIdAndUpdate(id, { adventures: adventuresArr })
    } catch (error) {
        throw new Error(error)
    }
}

const updateUser = async (id,data) =>{

     const updatedUser = await User.findByIdAndUpdate(id,{
        username : data.username,
        email : data.email,
        img : data.img,
    },{
        new:true
    })
   return updatedUser
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
    updateUser,
    logout,
}