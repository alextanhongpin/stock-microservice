// All the logic for rendering client static page lies here

import Router from 'koa-router'
const route = new Router()

route.get('/stocks', async(ctx, next) => {
  await ctx.render('home', {
    title: 'Home Page'
  })
})

export default route
