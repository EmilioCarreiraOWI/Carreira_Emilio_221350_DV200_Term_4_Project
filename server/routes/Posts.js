const express = require('express')

const postsSchema = require('../models/Posts')

const router = express();

//Get All
router.get('/api/posts/', async (req, res) => {
  const findPosts = await postsSchema.find();
  res.json(findPosts)
})

//Get Single
router.get('/api/posts/:id', async (req, res) => {
  const findPosts = await postsSchema.findById(req.params.id);
  res.json(findPosts)
})

//Update
router.put('/api/posts/:id', async (req, res) => {
  const { id } = req.params.id
  await postsSchema.updateOne({ id }, req.body)
    .then(response => res.json(response))
    .catch(error => res.status(500).json(error))
})


//Create
router.post('/api/posts', async (req, res) => {
  const posts = new postsSchema({ ...req.body });
  await posts.save()
    .then(response => res.json(response))
    .catch(error => res.status(500).json(error))
})

//Delete
router.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params.id
  await postsSchema.findByIdAndDelete(req.params.id)
    .then(response => res.json(response))
    .catch(error => res.status(500).json(error))
})

// Create a comment for a specific post
router.post('/api/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;
  const commentData = req.body;

  try {
    const post = await postsSchema.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push(commentData);

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json(error);
  }
});

// Update a specific comment from a specific post
router.patch('/api/posts/:postId/comments/:commentId/votes', async (req, res) => {
  const { postId, commentId } = req.params;
  const voteType = req.body.voteType;
  const UserId = req.body.UserId;

  try {
    const post = await postsSchema.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const hasVoted = comment.hasVoted.find(vote => vote.UserId === UserId);
    if (!hasVoted) {
      comment.hasVoted.push({ UserId, VoteType: voteType });
      if (voteType === 'Up') {
        comment.votes += 1;
      } else if (voteType === 'Down') {
        comment.votes -= 1;
      }
    } else {
      const existingVoteType = hasVoted.VoteType;
      if (existingVoteType === voteType) {
        const voteIndex = comment.hasVoted.findIndex(vote => vote.UserId === UserId);
        comment.hasVoted.splice(voteIndex, 1);
        if (voteType === 'Up') {
          comment.votes -= 1;
        } else if (voteType === 'Down') {
          comment.votes += 1;
        }
      } else {
        hasVoted.VoteType = voteType;
        if (voteType === 'Up') {
          comment.votes += 2;
        } else if (voteType === 'Down') {
          comment.votes -= 2;
        }
      }
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json(error);
  }
});

// Update the votes for a specific post
router.patch('/api/posts/:id/votes', async (req, res) => {
  const postId = req.params.id;
  const voteType = req.body.voteType;
  const UserId = req.body.UserId;

  try {
    const post = await postsSchema.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const hasVoted = post.hasVoted.find(vote => vote.UserId === UserId);
    if (!hasVoted) {
      post.hasVoted.push({ UserId, VoteType: voteType });
      if (voteType === 'Up') {
        post.votes += 1;
      } else if (voteType === 'Down') {
        post.votes -= 1;
      }
    } else {
      const existingVoteType = hasVoted.VoteType;
      if (existingVoteType === voteType) {
        const voteIndex = post.hasVoted.findIndex(vote => vote.UserId === UserId);
        post.hasVoted.splice(voteIndex, 1);
        if (voteType === 'Up') {
          post.votes -= 1;
        } else if (voteType === 'Down') {
          post.votes += 1;
        }
      } else {
        hasVoted.VoteType = voteType;
        if (voteType === 'Up') {
          post.votes += 2;
        } else if (voteType === 'Down') {
          post.votes -= 2;
        }
      }
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post votes:', error);
    res.status(500).json(error);
  }
});

// Delete a specific comment
router.delete('/api/posts/:id/comments/:commentId', async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;

  try {
    const post = await postsSchema.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    post.comments.pull(comment);

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json(error);
  }
});






module.exports = router