const Adventure = require("../models/Adventure")

require('dotenv').config()

async function addAdventure(adventure, id) {
    try {
        adventure.owner = id;
        return await Adventure.create({ ...adventure })
    } catch (error) {
        throw new Error(error)
    }
}
async function getAllAdventures() {
    return await Adventure.find({}).sort({ created_at: -1 });
}

async function getAdventureById(id) {
    return await Adventure.findById(id);
}

async function updateAdventure(id, adventure) {
    const existing = await Adventure.findById(id);

    existing.title = adventure.title;
    existing.description = adventure.description;
    existing.price = adventure.price;

    return existing.save();
}

async function deleteAdventure(id) {
    await Adventure.findByIdAndDelete(id)
}

async function getMostRated() {
    const Adventures = await Adventure.find({}).sort({ created_at: -1 }).limit(3);
    return Adventures
}

async function getByOwner(id) {
    return await Adventure.find({ _ownerId: id })
}


module.exports = {
    addAdventure,
    getAllAdventures,
    getAdventureById,
    updateAdventure,
    deleteAdventure,
    getMostRated,
    getByOwner
}