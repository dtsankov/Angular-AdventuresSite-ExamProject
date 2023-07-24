const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i


const adventureSchema = new Schema({
    title: { type: String, required: true, minlength: [5, 'Title must be at least 5 characters long'] },
    description: { type: Array, required: true, minlength: [10, 'Description must be at least 10 characters long'] },
    price: { type: Number, required: true, min: [15, 'Price must be at least 15BGN!'] },
    img: { type: String, required: [true, 'Image URL is required'], validate:{
        validator: (value)=> URL_PATTERN.test(value),
        message : "Image URL is not valid "
    } },
    ratings : {type : mongoose.Mixed, default:string},
    _ownerId: { type: Types.ObjectId, ref: 'User', required: true },

}, { timestamps: { createdAt: 'created_at' } });

const Adventure = model('Adventure', adventureSchema);

module.exports = Adventure;