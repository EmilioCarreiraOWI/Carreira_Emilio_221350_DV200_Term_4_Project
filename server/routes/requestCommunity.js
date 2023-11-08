const multer  = require('multer')


const express = require('express')

const requestCommunitySchema = require('../models/requestCommunity');

const router = express();

//Get All
router.get('/api/requestCommunity/', async (req, res) => {
    const findRequestCommunity = await requestCommunitySchema.find();
    res.json(findRequestCommunity)
})

//Get Single
router.get('/api/requestCommunity/:id', async (req, res) => {
    const findRequestCommunity = await requestCommunitySchema.findById(req.params.id);
    res.json(findRequestCommunity)
})

//Update
router.put('/api/requestCommunity/:id', async (req, res) => {
    const { id } = req.params.id
    await requestCommunitySchema.updateOne({id} , req.body)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
})


//Create
router.post('/api/requestCommunity', async (req, res) => {
    const requestCommunity = new requestCommunitySchema({ ...req.body });
    await requestCommunity.save()
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
})

//Delete
router.delete('/api/requestCommunity/:id', async (req, res) => {
    const { id } = req.params.id
    await requestCommunitySchema.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
})




module.exports = router
