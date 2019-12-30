const postService = require("../../services/postService")
const util = require("../util")
const db = require("../../db")

function initDb() {
  let json = util.readJsonDataFile("posts.json")
  json.forEach((item) => {
    postService.insertPost(item)
  })
  return json
}

describe('test postService', () => {
  let postsJson
  beforeAll(() => {
    postsJson = initDb()
  })

  afterAll(() => {
    db.deleteCollection("posts")
  })

  test('first item matches', () => {
    expect(postService.getPostById(1)).toBe(postsJson[0])
  })

  test('update post', () => {
    var aPost = postService.getPostById(1)
    aPost.title = "updated"
    postService.updatePost(aPost)
    expect(postService.getPostById(1).title).toBe("updated")
  })

})
