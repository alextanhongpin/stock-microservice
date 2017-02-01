const errors = () => {
  return async(ctx, next) => {
    try {
      await next()
    } catch (err) {
      // console.log('GlobalErrorHandling', err)
      ctx.body = {
        error: err.message,
        error_description: err.description
      }
      ctx.status = err.status || 500
    }
  }
}

export default errors


// {
//   "jsonapi": {
//     "version": "1.0"
//   }
//   links: {
//     self,
//     related,
//     pagination
//   }
//   included,
//   data: null,
//   data: {
//     id: 1, // Not required if it's a new item
//     type: 'article',
//     links,
//     meta,
//     attributes: {
//       title
//     }
//     relationships: {
//       author: {
//         links: {
//           self:,
//           related
//         },
//         data: { type: 'people', id: 9 }
//       }
//     }
//   }
//   data: []
//   errors,
//   meta: {
//     "copyright": "Copyright 2015 Example Corp.",
//     "authors": [
//       "Yehuda Katz",
//       "Steve Klabnik",
//       "Dan Gebhardt",
//       "Tyler Kellen"
//     ]
//   }
// }