const axios = require("axios").default
const util = require("../util")
const db = require("../../db")

// to run these tests - the server must be running at localhost:3001
const baseUrl = "http://localhost:3001/api/"
const userUrl = baseUrl + "users"
const postUrl = baseUrl + "posts"




describe('test acceptance criteria', () => {
  beforeAll(() => {
    util.loadFileIntoCollection("users.json", userUrl)
    util.loadFileIntoCollection("posts.json", postUrl)
  })
  afterAll(() => {
    db.deleteCollection("users")
    db.deleteCollection("posts")

  })

test('get user by id to prove it was created', async () => {
    let user = await util.getObject(userUrl + "/1")
    expect(user.username).toStrictEqual("Bret")
  })

  test('update a post', async () => {
    let post = await util.getObject(postUrl + "/1")
    post.title = "changed"
    await util.putObject(postUrl , post)
    let post2 = await util.getObject(postUrl + "/1")
    expect(post2.title).toStrictEqual("changed")
  })


})

