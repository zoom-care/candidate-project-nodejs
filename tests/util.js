const fs = require("fs");
const axios = require("axios").default

function readJsonDataFile(fileName) {
  const file = process.cwd() + "/data/" + fileName
  return JSON.parse(fs.readFileSync(file))
}


function loadFileIntoCollection(fileName, postUrl) {
  let items = readJsonDataFile(fileName)
  items.forEach((item) => {
    postObject(postUrl, item)
  })
  return items
}

async function getObject(url) {
  const obj = await axios.get(url)
  // console.log(obj.data)
  return obj.data
}

async function postObject(url, obj) {
  const resp = await axios.post(url, obj)
}

async function putObject(url, obj) {
  const resp = await axios.put(url, obj)
}

module.exports = { readJsonDataFile, loadFileIntoCollection, postObject, getObject, postObject, putObject }