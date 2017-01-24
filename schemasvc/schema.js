import Ajv from 'ajv'
import Toolbox from '../common/toolbox.js'
const ajv = Ajv({
  allErrors: true,
  removeAdditional: true,
  useDefaults: true,
  schemas: [
    require('./schema/get-schema-request.json'),
    require('./schema/get-schema-response.json'),
    require('./schema/get-schemas-request.json'),
    require('./schema/get-schemas-response.json')
  ]
})
const parser = Toolbox.Parser(ajv)
export default {
  getSchemaRequest: parser.request('http://localhost:3000/schemas/get-schema-request.json#'),
  getSchemaResponse: parser.response('http://localhost:3000/schemas/get-schema-response.json#'),

  getSchemasRequest: parser.request('http://localhost:3000/schemas/get-schemas-request.json#'),
  getSchemasResponse: parser.response('http://localhost:3000/schemas/get-schemas-response.json#')
}
