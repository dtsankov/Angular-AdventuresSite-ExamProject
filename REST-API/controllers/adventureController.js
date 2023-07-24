const { getMostRated, getAdventureById, updateAdventure, deleteAdventure, getAllAdventures, addAdventure } = require('../services/adventureServices');
const { updateUserAdventures } = require('../services/userServices');

const adventureController = require('express').Router();


//create Adventure
adventureController.post('/create', async (req, res) => {
    const data = req.body;
    try {
        const userId = req?.user?._id;
        const adventure = await addAdventure(data, userId)
        await updateUserAdventures(userId, adventure._id)
        res.status(201).json(adventure)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})

//get All Adventures
adventureController.get('/', async (req, res) => {
    const adventure = await getAllAdventures()
    res.status(200).json(adventure)
});


//get most rated adventures
adventureController.get('/most-recent', async (req, res) => {
    const adventure = await getMostRated()
    res.status(200).json(adventure);
})

//get adventure by ID
adventureController.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const adventure = await getAdventureById(id);
        if (adventure) {
            res.status(200).json(adventure)
        } else {
            throw new Error('Invalid Adventure ID!')
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
});

//update Adventure by ID
adventureController.put('/edit/:id', async (req, res) => {
    try {
        const adventure = await getAdventureById(req.params.id);

        if (req.user._id != adventure._ownerId) {
            return res.status(403).json({ message: 'You cannot edit this adventure' })
        }
        const result = await updateAdventure(req.params.id, req.body);
        res.status(200).json(result)
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message })
    }
});



// delete adventure
adventureController.delete('/:id', async (req, res) => {
    try {
        const adventure = await getAdventureById(req.params.id);
        if (req.user._id != adventure._ownerId._id) {
            return res.status(403).json({ err: err.message })
        }
        await deleteAdventure(req.params.id);
        res.status(204).end()
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
});










module.exports = adventureController;