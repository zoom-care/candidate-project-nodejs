const commentService = require("../../services/commentService")
const fs = require("fs");
const _ = require("lodash")
const util = require("../util")
const db = require("../../db")


function initComments() {
  let json = util.readJsonDataFile("comments.json")
  json.forEach((item) => {
    commentService.insertComment(item)
  })
  return json
}

describe('test commentService', () => {
  let commentsJson
  beforeAll(() => {
    db.initDb()
    commentsJson = initComments()
  });

  afterAll(() => {
    db.resetDb()
  })

  test('first item matches', () => {
    expect(commentService.getCommentById(1)).toBe(commentsJson[0])
  })


  test('all comments for post', () => {
    var commentsForPost = commentService.getCommentsByPostId(2)
    expect(commentsForPost.length).toBe(5)
  })

  test('test delete', () => {
    commentService.deleteComment(commentService.getCommentById(1))
    const aComment = commentService.getCommentById(1)
    expect(aComment).not.toBe(commentsJson[0])
  })
})
