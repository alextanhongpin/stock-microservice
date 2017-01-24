
import Router from 'koa-router'
import Endpoint from './endpoint.js'
// import Service from './service.js'

const route = new Router()
route.use(async(ctx, next) => {
  // Manually inject the service in the context
  ctx.service = Service()
  await next()
})

// Provide both REST and graphql interface
route.get('/api/v1/reits', Endpoint.getReits)

export default route
