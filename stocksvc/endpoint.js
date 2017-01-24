// endpoint.js

import schema from './schema.js'

// GET /stocks
const getStocks = async(ctx, next) => {
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

// POST /stocks
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

// GET /static.stocks
const geti3investorData = async (ctx, next) => {
  const data = await ctx.service.geti3investorData()
  
  ctx.status = 201
  ctx.body = data
}
const getMalaysiaStockBizData = async (ctx, next) => {
  const data = await ctx.service.getMalaysiaStockBizData()
  
  ctx.status = 201
  ctx.body = data
}
const getYahooFinanceData = async (ctx, next) => {
  const data = await ctx.service.getYahooFinanceData()

  ctx.status = 201
  ctx.body = data
}
// const postStock = async(ctx, next) => {
//   try {
//     const request = schema.postStockRequest()
//   }
// }

export default {
  getStocks,
  postStock,
  geti3investorData,
  getMalaysiaStockBizData,
  getYahooFinanceData
}
