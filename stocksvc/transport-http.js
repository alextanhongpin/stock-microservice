
import Router from 'koa-router'
import Endpoint from './endpoint.js'
import Service from './service.js'
import Stock from './model.js'

const route = new Router()

route.use(async(ctx, next) => {
  // Manually inject the service in the context
  ctx.service = Service({
    Stock: Stock
  })
  await next()
})

// Provide both REST and graphql interface
route.get('/api/v1/stocks', Endpoint.getStocks)
route.post('/api/v1/stocks', Endpoint.postStock)

route.get('/api/v1/quotes/yahoo-finance', Endpoint.getYahooFinanceData)
route.get('/api/v1/quotes/i3investor', Endpoint.geti3investorData)
route.get('/api/v1/quotes/stock-biz', Endpoint.getMalaysiaStockBizData)

export default route
