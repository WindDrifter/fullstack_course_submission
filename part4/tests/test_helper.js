const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: 'Blog blah',
      author: "Wiggim",
    },
    {
      title: 'Browser can execute only Javascript',
      author: "Simpsons"
    },
    {
      title: 'Browset',
      author: "Simpsons"
    },
  ]

  initialUsers =[
    {
      username: "user1",
      name: "User Mc1",
      email: "user1@example.com",
      password: "password1"
    },
    {
      username: "user2",
      name: "User Mc2",
      email: "user2@example.com",
      password: "password2"
    },
    {
      username: "user3",
      name: "User Mc3",
      email: "user3@example.com",
      password: "password3"
    }
  ]


  const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

  module.exports = {
    initialBlogs,
    blogsInDb,
    initialUsers,
    usersInDb,
    nonExistingId
  }