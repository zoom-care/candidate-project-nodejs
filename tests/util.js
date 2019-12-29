const fs = require("fs");
const axios = require("axios").default

axios.defaults.headers.post['authorization'] = 'admin'
axios.defaults.headers.put['authorization'] = 'admin'
axios.defaults.headers.delete['authorization'] = 'admin'

function readJsonDataFile(fileName) {
  const file = process.cwd() + "/data/" + fileName
  return JSON.parse(fs.readFileSync(file))
}


async function loadFileIntoCollection(fileName, postUrl) {
  let items = readJsonDataFile(fileName)

  await Promise.all(items.map(async (item) => {
    return o = await postObject(postUrl, item)
    
  }));
  return items
}

async function getObject(url, onlyData = true) {
  const obj = await axios.get(url)
  // console.log(obj.data)
  return onlyData ? obj.data : obj
}

async function postObject(url, obj) {
  const resp = await axios.post(url, obj)
}

async function putObject(url, obj) {
  const resp = await axios.put(url, obj)
}

async function deleteObject(url, obj) {
  const resp = await axios.delete(url, obj)
}

module.exports = { readJsonDataFile, loadFileIntoCollection, postObject, getObject, postObject, putObject, deleteObject }