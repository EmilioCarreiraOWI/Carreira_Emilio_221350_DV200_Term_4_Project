const express = require('express')

const postDeleteSchema = require('../models/PostDelete')

const router = express();

//Get All
router.get('/api/postsDelete/', async (req, res) => {
    const findPostsDelete = await postDeleteSchema.find();
    res.json(findPostDelete)
})

//Get Single
router.get('/api/postDelete/:id', async (req, res) => {
    const findPostDelete = await postDeleteSchema.findById(req.params.id);
    res.json(findPostDelete)
})

//Create
router.post('/api/postDelete', async (req, res) => {
  const postDelete = new postDeleteSchema({ ...req.body });
  await postDelete.save()
      .then(response => res.json(response))
      .catch(error => res.status(500).json(error))
})

//Delete
router.delete('/api/postDelete/:id', async (req, res) => {
  const { id } = req.params.id
  await postDeleteSchema.findByIdAndDelete(req.params.id)
      .then(response => res.json(response))
      .catch(error => res.status(500).json(error))
})

module.exports = router
