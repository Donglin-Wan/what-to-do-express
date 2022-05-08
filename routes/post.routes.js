const express = require('express');
const router = express.Router();
const post = require('../models/post.model');
const m = require('../helpers/middlewares');
const { json } = require('express');

/* Get all todo items */
//Example GET (Get all todo items)
router.get('/', async (req, res) => {
  await post
    .getPosts()
    .then((posts) => res.json(posts))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

/* Get todo item by id */
// Task: Create the endpoint to return a selected todo item.
router.get('/:id', m.mustBeInteger, async (req, res) => {
  // res.json(req.params.id)
  await post.getPost(req.params.id).then((post) =>{res.json(post)} ).catch((err) => {
    if (err.status) {
      res.status(err.status).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  });
});

/* Insert a new todo item */
// Task: Create the endpoint to store a new todo item locally on the server.
router.post('/', m.checkFieldsPost, async (req, res) => {
  await post.insertPost(req.body).then((newPost) => {
    res.json(newPost)
  })
});

/* Update selected todo item */
// Task: Create the endpoint to update one todo item locally on the server.
router.put('/:id', m.mustBeInteger, m.checkFieldsPost, async (req, res) => {
    await post.updatePost(req.params.id, req.body).then((updatedPost) => {
      res.json(updatedPost)
    }).catch((err) => {
      if(err.status){
        res.status(err.status).json({message: err.message})
      } else {
        res.status(500).json({message: err.message})
      }
    })

});

/* Delete selected todo item */
// Task: Create the endpoint to remove one todo item locally on the server.
router.delete('/:id', m.mustBeInteger, async (req, res) => {
  await post.deletePost(req.params.id).then(()=> {
    res.json("Post has been deleted")
  }).catch((err)=> {
    if(err.status){
      res.status(err.status).json({message: err.message})
    } else {
      res.status(500).json({message: err.message})
    }
  })
});

// Routes
module.exports = router;
