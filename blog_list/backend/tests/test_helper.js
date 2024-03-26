const Post = require('../models/post')

const initialPosts = [
  {
    title: 'First blog post',
    author: 'Avery Littlemore',
    url: 'avery.com',
    likes: 1000,
  },
  {
    title: 'Second blog post',
    author: 'Avery L',
    url: 'avery.ca',
    likes: 10,
  },
]

const postsInDb = async () => {
  const posts = await Post.find({})
  return posts.map(post => post.toJSON())
}

module.exports = {
  initialPosts, postsInDb
}