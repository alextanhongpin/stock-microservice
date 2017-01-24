// endpoint.js

import schema from './schema.js'

// GET /schemas/get-stock-request.json#
const getSchema = async(ctx, next) => {
  try {
    const request = schema.getSchemaRequest({
      schema_id: ctx.request.body.schema_id
    })
    const data = await ctx.service.getSchema(request)
    const response = schema.getSchemaResponse(data)

    ctx.status = 200
    ctx.body = response
  } catch (err) {
    throw err
  }
}

// GET /schemas
const getSchemas = async(ctx, next) => {
  try {

    const request = schema.getSchemasRequest()
    const data = await ctx.service.getSchemas(request)
    const response = schema.getSchemasResponse(data)

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
