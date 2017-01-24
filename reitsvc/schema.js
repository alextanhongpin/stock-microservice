import Ajv from 'ajv'
import Toolbox from '../common/toolbox.js'
const ajv = Ajv({
  allErrors: true,
  removeAdditional: true,
  useDefaults: true,
  schemas: [
    // require('./schema/get-stock-request.json')
  ]
})
const parser = Toolbox.Parser(ajv)
export default {
  // getStockRequest: parser.request('http://localhost:3000/schemas/get-stock-request.json#')
}
