const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const userObjects = helper.initialUsers.map(user => new User(user))
  const promiseArray2 = await userObjects.map(user => user.save())
  await Promise.all(promiseArray2)  
  const firstUser = await User.findOne({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog({title: blog.title, author: blog.author, user:firstUser.id }))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  
})



// test('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })
describe('getting all blogs', ()=>{
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toBe(helper.initialBlogs.length)})
  test('all blogs should have username', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].user.username).toBeDefined()})
})


describe('adding blogs', ()=>{
  test('ensure a blog can be added', async()=>{
    let users = await helper.usersInDb()
    let user = users[0]
    const userForToken = {
      username: user.username,
      id: user.id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)
    const newBlog = {
        title: 'Blog blah',
        author: "Wiggim",
        url: "www.reddit.com/r/blogs"
      }
    const precount = await Blog.countDocuments()
    console.log(precount)
    const response = await api.post('/api/blogs/').set('Authorization', `bearer ${token}`).send(newBlog)
    const postcount = await Blog.countDocuments()
    console.log(postcount)

    expect((postcount-precount)).toBe(1)
  })


  test('newly adding blogs default likes to 0', async()=>{
    let users = await helper.usersInDb()
    let user = users[0]
    const userForToken = {
      username: user.username,
      id: user.id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)
    const newBlog = {
        title: 'Blog blah',
        author: "Wiggim",
        url: "www.reddit.com/r/blogs"
      }
    const response = await api.post('/api/blogs/').set('Authorization', `bearer ${token}`).send(newBlog)
    
    expect(response.body.likes).toBe(0)
  })

  test('ensure a blog cannot be added if missing parameters', async()=>{
    let users = await helper.usersInDb()
    let user = users[0]
    const userForToken = {
      username: user.username,
      id: user.id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)
    const newBlog = {
        title: '',
        author: "Wiggim",
        url: "www.reddit.com/r/blogs"
      }
    const precount = await Blog.countDocuments()
    const response = await api.post('/api/blogs/').set('Authorization', `bearer ${token}`).send(newBlog).expect(400)
    const postcount = await Blog.countDocuments()

    expect((postcount-precount)).toBe(0)
  })


  test('newly adding blogs should have a user id', async()=>{
    let users = await helper.usersInDb()
    let user = users[0]
    const userForToken = {
      username: user.username,
      id: user.id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)
    const newBlog = {
        title: 'Blog blah',
        author: "Wiggim",
        url: "www.reddit.com/r/blogs"
      }
    const response = await api.post('/api/blogs/').set('Authorization', `bearer ${token}`).send(newBlog)
    
    expect(response.body.user).toBe(user.id)
  })
})

describe("removal of blogs", ()=>{
  test('ensure total document count is 0', async()=>{
    const blogs = await helper.blogsInDb()
    const removedID = blogs[0].id
    const precount = await Blog.countDocuments()
    await api.delete(`/api/blogs/${removedID}`)
    const postcount = await Blog.countDocuments()
    expect((postcount-precount)).toBe(-1)
  })
  test('Blog is not in database', async()=>{
    const blogs = await helper.blogsInDb()
    const removedBlog = blogs[0]
    const removedID = removedBlog.id
    await api.delete(`/api/blogs/${removedID}`)
    const allBlogs = await Blog.find({})
    expect(allBlogs).toEqual(
      expect.not.arrayContaining([removedBlog]),
    );
  })


})

describe("update of blogs", ()=>{
  test('ensure title is updated', async()=>{
    const blogs = await helper.blogsInDb()
    const targetedBlogId = blogs[0].id
    const newContents = {
      title: 'Nope',
    }
    await api.put(`/api/blogs/${targetedBlogId}`).send(newContents)
    const targetedBlog = await Blog.findById(targetedBlogId)
    expect(targetedBlog.title).toBe(newContents.title)
  })


})
afterAll(() => {
  mongoose.connection.close()
})