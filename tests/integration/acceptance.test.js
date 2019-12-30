const axios = require("axios").default
const util = require("../util")
const db = require("../../db")

// to run these tests - the server must be running at localhost:3001
const baseUrl = "http://localhost:3001/api/v1/"
const userUrl = baseUrl + "users"
const postUrl = baseUrl + "posts"
const commentUrl = baseUrl + "comments"

describe('test acceptance criteria', () => {
  beforeAll(async (done) => {
    await util.loadFileIntoCollection("users.json", userUrl)
    await util.loadFileIntoCollection("posts.json", postUrl)
    await util.loadFileIntoCollection("comments.json", commentUrl)
    done()
  })
  afterAll(() => {
    db.resetDb()
  })

  test('get user by id to prove it was created', async () => {
    try {
      let user = await util.getObject(userUrl + "/1")
      expect(user.username).toStrictEqual("Bret")
    } catch (e) {
      console.log(e.message)
    }
  })


  test('get all comments for post', async () => {
    let response
    try {
      let postId = 2
      let url = postUrl + `/${postId}/comments`
      response = await util.getObject(url, false)
    } catch (e) {
      console.log(e.message)
    } finally {
      expect(response.data.length).toBe(5)
    }
  })

  test('delete a comment', async () => {
    let resourceUrl = commentUrl + "/1"
    let comment = await util.getObject(resourceUrl)
    await util.deleteObject(resourceUrl, comment)
    try {
      let resp = await util.getObject(resourceUrl, false)
    } catch (e) {
      expect(e.response.status).toBe(404)
    }
  })
  test('update a post', async () => {
    let post = await util.getObject(postUrl + "/1")
    post.title = "changed"
    await util.putObject(postUrl, post)
    let post2 = await util.getObject(postUrl + "/1")
    expect(post2.title).toStrictEqual("changed")
  })


})

