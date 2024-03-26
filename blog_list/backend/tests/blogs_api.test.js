const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const Post = require('../models/post')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Post.deleteMany({})
  let postObject = new Post(helper.initialPosts[0])
  await postObject.save()
  postObject = new Post(helper.initialPosts[1])
  await postObject.save()
})

describe('on existing blogs', () => {
  test('blog posts are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are an accurate number of blog posts', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialPosts.length)
  })

  test('the posts include unique ID property: id', async () => {
    const response = await api.get('/api/blogs')
  
    const ids = response.body.map(e => e.id)
    assert(ids)
  })
})

describe('modifying blogs', () => {
  test('the first post is by Avery Littlemore', async () => {
    const response = await api.get('/api/blogs')

    const authors = response.body.map(e => e.author)
    assert(authors[0].includes('Avery Littlemore'))
  })

  test('a valid blog post can be added ', async () => {
    const newPost =   {
      title: 'THIRD blog post',
      author: 'AVE',
      url: 'avery.org',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const authors = response.body.map(r => r.author)

    assert.strictEqual(response.body.length, helper.initialPosts.length + 1)

    assert(authors.includes('AVE'))
  })
  
  describe('deletion of a post', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const postsAtStart = await helper.postsInDb()
      const postToDelete = postsAtStart[0]
  
      await api
        .delete(`/api/blogs/${postToDelete.id}`)
        .expect(204)
  
      const postsAtEnd = await helper.postsInDb()
  
      assert.strictEqual(postsAtEnd.length, helper.initialPosts.length - 1)
  
      const authors = postsAtEnd.map(r => r.author)
      assert(!authors.includes(postToDelete.content))
    })
  })

  test('updating existing blog post', async () => {
    const postsAtStart = await helper.postsInDb()

    const updatedPost = {
      title: 'First blog post',
      author: 'Avery Littlemore',
      url: 'avery.com',
      likes: 1001,
    }

    await api
      .put(`/api/blogs/${postsAtStart[0].id}`)
      .send(updatedPost)

    const posts = await helper.postsInDb()

    assert.strictEqual(posts.length, helper.initialPosts.length)

    const likes = posts.map(r => r.likes)
    assert(likes.includes(updatedPost.likes))
  })
})

after(async () => {
  await mongoose.connection.close()
})