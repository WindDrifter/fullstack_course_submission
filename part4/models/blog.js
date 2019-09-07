const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    url: String,
    likes: {type: Number, default: 0},
    user: {    type: mongoose.Schema.Types.ObjectId,    ref: 'User'  }
  })

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        document.populate('user', { username: 1, name: 1 })
        delete returnedObject.__v
    }
    })  


const Blog = mongoose.model('Blog', blogSchema)



module.exports = Blog