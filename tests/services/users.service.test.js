const userService = require("../../services/userService")
const fs = require("fs");
const { users } = require("../../db")

function initDb() {
  const file = process.cwd() + "/data/users.json"
  let json = JSON.parse(fs.readFileSync(file))
  json.forEach((item) => {
    userService.upsertUser(item)
  })
  return json
}

describe('test userService', () => {
  let usersJson
  beforeAll(() => {
    usersJson = initDb();
  });

  test('first item matches', () => {
    expect(userService.getUserById(1)).toBe(usersJson[0])
  });

  test('count matches', () => {
    expect(userService.userList().length).toBe(usersJson.length)
  })

  
  test('test delete', () => {
    userService.deleteUser(1)
    expect(userService.getUserById(1)).not.toBe(usersJson[0])
  })
})
