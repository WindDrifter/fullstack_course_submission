const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const getTokenFrom = request => {  
  const authorization = request.get('Authorization')  
  console.log(authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) 
    {
          return authorization.substring(7)  
    }
  return null
}
blogsRouter.get('', async (request, response, next) => {
    const allBlogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(allBlogs)
  })
  
blogsRouter.post('', async (request, response, next) => {
  const blog = new Blog(request.body)
  try{
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) 
    {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    blog.user=user.id
    blog.author = user.name
    const result = await blog.save()
    user.blogs = user.blogs.concat(result.id)    
    await user.save()
    response.json(result.toJSON())
  }
  catch(exception){
    console.log(exception)
    next(exception)

  }

})


blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  try{
    await Blog.findByIdAndDelete(id)
    response.json("Removal success")
  }
  catch(exception){
    next(exception)

  }

})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const data = request.body
  try{
    const result = await Blog.findByIdAndUpdate(id, data)
    response.json(result)
  }
  catch(exception){
    next(exception)

  }

})


blogsRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id
  try{
    const result = Blog.findById(id)
    response.json(result)
  }
  catch(exception){
    next(exception)

  }

})


module.exports = blogsRouter