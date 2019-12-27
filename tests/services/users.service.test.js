const userService = require("../../services/userService")
const fs = require("fs");
const _ = require("lodash")
const util = require("../util")
const db = require("../../db")


function initUsers() {
  let json = util.readJsonDataFile("users.json")
  json.forEach((item) => {
    userService.insertUser(item)
  })
  return json
}

describe('test userService', () => {
  let usersJson
  beforeAll(() => {
    db.initDb()
    usersJson = initUsers()
  });

  afterAll(() => {
    db.resetDb()
  })

  test('first item matches', () => {
    expect(userService.getUserById(1)).toBe(usersJson[0])
  })

  test('count matches', () => {
    expect(userService.userList().length).toBe(usersJson.length)
  })


  test('insert', () => {
    var aUser = _.last(usersJson)
    aUser.id = 1000
    aUser.username = "abc1"
    userService.insertUser(aUser)
    expect(userService.getUserById(1000).username).toBe("abc1")
  })

  test('test delete', () => {
    userService.deleteUser(userService.getUserById(1))
    const aUser = userService.getUserById(1)
    console.log("test delete")
    console.log(aUser)
    expect(aUser).not.toBe(usersJson[0])
  })
})
