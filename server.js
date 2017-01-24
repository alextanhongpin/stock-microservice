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
import FeatureToggle from './common/feature-toggle.js'

const PORT = process.env.PORT

// Feature Toggle
const SCHEMASVC = process.env.SCHEMASVC
const STOCKSVC = process.env.STOCKSVC
const REITSVC = process.env.REITSVC
const GLOSSARYSVC = process.env.GLOSSARYSVC

const app = new Koa()

const featureToggle = FeatureToggle(app)

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

featureToggle.register({
  service: stocksvcHTTP,
  name: 'stocksvc',
  enabled: STOCKSVC
})

featureToggle.register({
  service: schemasvc,
  name: 'schemasvc',
  enabled: SCHEMASVC
})

featureToggle.register({
  service: reitsvc,
  name: 'reitsvc',
  enabled: REITSVC
})

app
.use(client.routes())
.use(client.allowedMethods())

if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`listening to port *:${PORT}.\npress ctrl + c to cancel.`)
  })
}

export default app
