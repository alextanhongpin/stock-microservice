
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: 8181 })
// const express = require('express')

// const app = express()
// app.use(express.static(__dirname, +'/public'))

// app.get('/*', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html')
// })

let stocks = {
  AAPL: 95.00,
  MSFT: 50.00,
  AMZN: 300.00,
  GOOG: 550.00,
  YHOO: 35.00
}

function randomInterval (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

let stockUpdater
function randomStockUpdater () {
  for (let symbol in stocks) {
    if (stocks.hasOwnProperty(symbol)) {
      const randomizedChange = randomInterval(-150, 150)
      const floatChange = randomizedChange / 100
      stocks[symbol] += floatChange
    }
  }
  var randomMSTime = randomInterval(500, 2500)
  stockUpdater = setTimeout(() => {
    randomStockUpdater()
  }, randomMSTime)
}

randomStockUpdater()

wss.on('connection', (ws) => {
  let clientStocks = []
  let clientStockUpdater
  function sendStockUpdates (ws) {
    if (ws.readyState === 1) {
      const stocksObj = {}
      for (let i = 0; i < clientStocks.length; i += 1) {
        symbol = clientStocks[i]
        stocksObj[symbol] = stocks[symbol]
      }
      ws.send(JSON.stringify(stocksObj))
    }
  }
  clientStockUpdater = setInterval(() => {
    sendStockUpdates(ws)
  }, 1000)

  console.log('client connected')
  ws.on('message', (message) => {
    console.log(message)
    const stock_request = JSON.parse(message)
    clientStocks = stock_request['stocks']
    sendStockUpdates(ws)
  })

  ws.on('close', () => {
    if (typeof clientStockUpdater !== undefined) {
      clearInterval(clientStockUpdater)
    }
  })
})

// app.listen(4000, () => {
//   console.log('listening to port*:' + 4000)
// })

