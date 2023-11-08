const mongoose = require('mongoose')

const PostsSchema = mongoose.Schema({
  postAuthorID: {
    type: String,
    required: true
  },
  postAuthorName: {
    type: String,
    required: true
  },
  postType: {
    type: String,
    required: true
  },
  community: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  postContent: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  tags: {
    type: [String],
    required: true
  },
  votes: {
    type: Number,
    required: true
  },
  hasVoted: [{
    UserId: {
      type: String,
      required: false
    },
    VoteType: {
      type: String,
      required: false
    }
  }],
  comments: [{
    time: {
      type: Date,
      default: Date.now
    },
    votes: {
      type: Number,
      default: 0
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    author: {
      type: String,
      required: false
    },
    authorAvatar: {
      type: String,
      required: false
    },
    hasVoted: [{
      UserId: {
        type: String,
        required: false
      },
      VoteType: {
        type: String,
        required: false
      }
    }]
  }]

})

module.exports = mongoose.model("Posts", PostsSchema)