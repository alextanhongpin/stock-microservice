import Koa from 'koa'
import Router from 'koa-router'
import render from 'koa-ejs'
import logger from 'koa-logger'
import serve from 'koa-static'
import userAgent from 'koa-useragent'
import parser from 'koa-bodyparser'
import mount from 'koa-mount'
import path from 'path'
import co from 'co'
// import _ from './common/database.js'

// import oauthsvc from './oauthsvc/transport.js'
// import authsvc from './authsvc/transport.js'
import reitsvc from './reitsvc/transport.js'
import schemasvc from './schemasvc/transport.js'
import stocksvcHTTP from './stocksvc/transport-http.js'
import stocksvcWebSocket from './stocksvc/transport-websocket.js'
import client from './client/index.js'

import errors from './modules/errors.js'

const PORT = process.env.PORT
const app = new Koa()

render(app, {
  root: path.join(__dirname, 'view'),
  layout: '_base',
  viewExt: 'html',
  cache: false,
  debug: true
})

app.context.render = co.wrap(app.context.render)

app
.use(serve(path.join(__dirname, 'public')))
.use(errors())
.use(userAgent())
// .use(logger())
.use(parser())

app
.use(stocksvcHTTP.routes())
.use(stocksvcHTTP.allowedMethods())

app
.use(schemasvc.routes())
.use(schemasvc.allowedMethods())

app
.use(reitsvc.routes())
.use(reitsvc.allowedMethods())

app
.use(client.routes())
.use(client.allowedMethods())

if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`listening to port *:${PORT}.\npress ctrl + c to cancel.`)
  })
}

export default app
