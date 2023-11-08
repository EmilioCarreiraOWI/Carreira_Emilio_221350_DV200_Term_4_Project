const mongoose = require('mongoose')

const PostDeleteSchema = mongoose.Schema({
  postBy: {
    type: String,
    required: true
  },
  deletedBy: {
    type: String,
    required: true
  },
  violation: {
    type: String,
    required: true
  },
  timeout: {
    type: String,
    required: true
  },
  postContent: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  aditionalComment: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("PostDelete", PostDeleteSchema)