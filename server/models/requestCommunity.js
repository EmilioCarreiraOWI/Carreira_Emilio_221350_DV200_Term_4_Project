const mongoose = require('mongoose')

const CommunitySchema = mongoose.Schema({
  
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageProfile: {
    type: String,
    required: true
  },
  imageBackground: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  
  
})

module.exports = mongoose.model("Community", CommunitySchema)