const reitsData = require('./data/all.json')

import schema from './schema.js'

const getReits = async(ctx, next) => {
  try {
    console.log(ctx.query)
    const request = schema.getReitsRequest({
      query: ctx.query.query
    })
    const reits = await ctx.service.getReits(request)
    const response = schema.getReitsResponse(reits)

    // Serve the .json
    ctx.status = 200
    ctx.body = response
  } catch (err) {
    throw err
  }
}

export default {
  getReits
}
