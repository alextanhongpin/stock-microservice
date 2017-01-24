// Dependencies
import request from 'request'

// Static data
import i3investorData from '../data/investor/all.json'
import malaysiaStockBizData from '../data/malaysia-stock-biz/all.json'
import yahooFinanceData from '../data/malaysia-stock-biz/all.json'


// The authentication interface
class StockServiceInterface {
  getStocks () {
    throw new Error('StockServiceInterface: getStocks is not implemented')
  }
  getStocksPurchased () {

  }
}

class StockService extends StockServiceInterface {
  constructor (props) {
    super(props)
    // Pass in the StocksDB context through dependency injection (DI)
    this.Stock = props.Stock
  }
  // Description: Get the stocks from the watchlist
  async getStocks ({ symbols, provider = 'google' }) {
    // Yahoo Service
    if (provider === 'yahoo') {
      return this.getYahooStocks({ symbols })
    }
    return this.getGoogleStocks({ symbols })
  }
  // Description: Get the google stocks
  async getGoogleStocks ({ symbols }) {
    return new Promise((resolve, reject) => {
      const googleFinanceURL = 'https://www.google.com/finance/info?infotype=infoquoteall&q=' + symbols.join(',')

      request(googleFinanceURL, {
        method: 'GET'
      }, (err, response, body) => {
        if (err) {
          reject(err)
        }
        if (body) {
          // Sanitize body
          const sanitizedBody = body.replace('//', '')
          try {
            const stocks = JSON.parse(sanitizedBody)
            // Map and resolve the response
            resolve({
              stocks: stocks.map(mapGoogleStock)
            })
          } catch (err) {
            console.log(err)
          }
        }
      })
    })
  }
  async getYahooStocks ({ symbols }) {
    return new Promise((resolve, reject) => {
      const yahooQueryURL = 'https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quotes where symbol in ("' + symbols.join(',') + '")&format=json&env=store://datatables.org/alltableswithkeys&callback='
      request(yahooQueryURL, {
        method: 'GET'
      }, (err, response, body) => {
        if (err) {
          reject(err)
        }
        if (body) {
          // Sanitize body
          const sanitizedBody = body.replace('//', '')
          // NOTE: What is it's an array?
          try {
            const stocks = JSON.parse(sanitizedBody)
            // Map and resolve the response
            resolve({
              stocks: stocks.map(mapYahooStocks)
            })
          } catch (err) {
            console.log(err)
          }
        }
      })
    })
  }
  async postStock ({ ticker, name, price, unit, state }) {
    const Stock = this.Stock
    const stock = new Stock()
    stock.ticker = ticker
    stock.name = name
    stock.price = price
    stock.unit = unit
    stock.state = state

    await stock.save()

    // Return a JSON copy
    return Object.assign({}, stock)
  }
  // Services with the ending *Data$ means it's serving static data 
  async geti3investorData () {
    return Promise.resolve(i3investorData)
  }

  async getMalaysiaStockBizData () {
    return Promise.resolve(malaysiaStockBizData)
  }

  async getYahooFinanceData () {
    return Promise.resolve(yahooFinanceData)
  }

}

// Mappers for models
const mapGoogleStock = (json) => {
  return {
    id: json.id,
    symbol: json.t,
    exchange: json.e,
    last_trade_price: json.l, // last trade price
    // last_
    last_trade_with_currency: json.l_cur,
    last_trade_time: json.ltt,
    last_trade_datetime_string: json.lt_dts,
    last_trade_datetime_long: json.lt,
    dividend: json.div,
    yield: json.yld,
    last_trade_size: json.s,
    change: json.c,
    // change_price: json.c_fix,
    change_percent: json.cp,
    // json.col
    // change_percent: json.cp_fix,
    // .eo
    // .delay
    extended_hours_last_trade_price: json.el,
    extended_hours_last_trade_with_currency: json.el_cur,
    extended_hours_change: json.ec,
    extended_hours_change_percent: json.ecp,
    previous_close_price: json.pcls_fix,
    pe_ratio: json.pe,
    fw_pe: json.fwpe,
    beta: json.beta,
    name: json.name,
    inst_own: json.inst_own,
    type: json.type,
    open: json.op,
    high: json.hi,
    low: json.lo,
    volume: json.vo,
    average_volume: json.avvo,
    high_52: json.hi52,
    low_52: json.lo52,
    market_cap: json.mc,
    eps: json.eps,
    shares: json.shares
  }
}

const mapYahooStocks = (json) => {
  return json
}

// Export a new auth service
export default (options) => {
  return new StockService(options)
}
