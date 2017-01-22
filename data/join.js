const fs = require('fs')


function compileMalaysiaStockBizData() {
  const data = 'abcdefghijklmnopqrstuvwxyz'.split('').reduce((store, alphabet) => {
    store = store.concat(require(`./malaysia-stock-biz/${alphabet}.json`))
    return store
  }, [])

  const json = JSON.stringify(data)

  fs.writeFile('./data/malaysia-stock-biz/all.json', json, 'utf8', () => {
    console.log('successfully wrote json file')
  })
}
function complileKLSE3vestorFile() {
  let data = 'abcdefghijklmnopqrstuvwxyz'.split('').reduce((store, alphabet) => {
    store = store.concat(require(`./investor/${alphabet}.json`))
    return store
  }, [])

  data = data.concat(require(`./investor/0-9.json`))

  const json = JSON.stringify(data)

  fs.writeFile('./data/investor/all.json', json, 'utf8', () => {
    console.log('successfully wrote json file')
  })
}

complileKLSE3vestorFile()