
import Router from 'koa-router'
import Endpoint from './endpoint.js'
import Service from './service.js'

const route = new Router()

route.use(async(ctx, next) => {
  ctx.service = Service()
  await next()
})

route.get('/schemas', Endpoint.getSchemas)
route.get('/schemas/:schema_id', Endpoint.getSchema)

export default route
