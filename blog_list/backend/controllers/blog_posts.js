const blogsRouter = require('express').Router()
const Post = require('../models/post')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const posts = await Post.find({})
  response.json(posts)
})

blogsRouter.get('/:id', (request, response, next) => {
  Post.findById(request.params.id)
    .then(post => {
      if (post) {
        response.json(post)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const post = new Post({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedPost = await post.save()
  user.posts = user.posts.concat(savedPost._id)
  await user.save()

  response.status(201).json(savedPost)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Post.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const post = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  await Post.findByIdAndUpdate(request.params.id, post, { new: true })
  response.json(post)


  // Post.findByIdAndUpdate(request.params.id, post, { new: true })
  //   .then(updatedPost => {
  //     response.json(updatedPost)
  //   })
  //   .catch(error => next(error))
})

module.exports = blogsRouter