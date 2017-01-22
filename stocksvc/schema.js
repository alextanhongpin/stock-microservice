import Ajv from 'ajv'
import Toolbox from '../common/toolbox.js'
const ajv = Ajv({
  allErrors: true,
  removeAdditional: true,
  useDefaults: true,
  schemas: [
    require('./schema/get-stock-request.json'),
    require('./schema/get-stock-response.json'),
    require('./schema/get-stocks-request.json'),
    require('./schema/get-stocks-response.json'),
    require('./schema/post-stock-request.json')
    // require('./schema/post-stock-response.json')
  ]
})
const parser = Toolbox.Parser(ajv)
export default {
  getStockRequest: parser.request('http://localhost:3000/schemas/get-stock-request.json#'),
  getStockResponse: parser.request('http://localhost:3000/schemas/get-stock-response.json#'),

  getStocksRequest: parser.request('http://localhost:3000/schemas/get-stocks-request.json#'),
  getStocksResponse: parser.request('http://localhost:3000/schemas/get-stocks-response.json#'),

  postStockRequest: parser.request('http://localhost:3000/schemas/post-stock-request.json#')
  // postStockResponse: parser.response('http://localhost:3000/schemas/post-stock-response.json#')
}
