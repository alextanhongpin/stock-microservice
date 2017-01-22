// endpoint.js

import schema from './schema.js'
import I3Data from '../data/investor/all.json'
import malaysiaStockBizData from '../data/malaysia-stock-biz/all.json'
import yahooFinanceData from '../data/malaysia-stock-biz/all.json'

// Login Endpoints
const getStocks = async(ctx, next) => {
  // await ctx.render('login', {
  //   title: 'Login'
  // })
  try {
    const request = schema.getStocksRequest({
      symbols: ctx.query.symbols.split(','),
      provider: ctx.query.provider
    })
    // Do checking to see which provider is choosen
    // Google or Yahoo
    const stocks = await ctx.service.getStocks(request)
    const response = schema.getStocksResponse(stocks)

    ctx.status = 200
    ctx.body = response
  } catch (err) {
    throw err
  }
}

const postStock = async(ctx, next) => {
  try {
    const request = schema.postStockRequest(ctx.request.body)
    const stocks = await ctx.service.postStock(request)
    // const response = schema.postStockResponse(stocks)
    ctx.status = 201
    ctx.body = response
  } catch (err) {
    throw err
  }
}


const getI3InvestorData = async (ctx, next) => {
  ctx.status = 201
  ctx.body = I3Data
}
const getMalaysiaStockBizData = async (ctx, next) => {
  ctx.status = 201
  ctx.body = malaysiaStockBizData
}
const getYahooFinanceData = async (ctx, next) => {
  ctx.status = 201
  ctx.body = yahooFinanceData
}
// const postStock = async(ctx, next) => {
//   try {
//     const request = schema.postStockRequest()
//   }
// }

export default {
  getStocks,
  postStock,
  getI3InvestorData,
  getMalaysiaStockBizData,
  getYahooFinanceData
}
