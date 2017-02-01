const checkContentType = async(ctx, next) => {
  if (!ctx.response.is('application/vnd.api+json')) {
    ctx.throw('Not Acceptable: Invalid content-type', 406)
  }
  next()
}

const setContentType = async(ctx, next) => {
  ctx.type = 'application/vnd.api+json'
}
