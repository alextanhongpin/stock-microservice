// endpoint.js

// GET /schemas
const getSchemas = async(ctx, next) => {
  try {
    const request = {}
    const response = await ctx.service.getSchemas(request)

    ctx.status = 200
    ctx.body = response
  } catch (err) {
    throw err
  }
}

// GET /schemas/get-stock-request.json#
const getSchema = async(ctx, next) => {
  try {
    const request = {
      schema_id: ctx.request.body.schema_id
    }
    const response = await ctx.service.getSchema(request)

    ctx.status = 200
    ctx.body = response
  } catch (err) {
    throw err
  }
}

export default {
  getSchema,
  getSchemas
}
