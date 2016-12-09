function openChest(){
  return Promise.resolve({chest:{contents:"treasher"}})
}

function punchGoat(){
  return Promise.resolve({punchGoat:{ bleeding: true}})
}

export default {
  openChest,
  punchGoat,
}
