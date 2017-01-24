import glob from 'glob'

// The authentication interface
class SchemaServiceInterface {
  getSchemas () {
    throw new Error('SchemaServiceInterface: getStocks is not implemented')
  }
  getSchema () {

  }
}

// Compile static json files
const readSchemasFromDir (dir) {
  return new Promise((resolve, reject) => {
    glob(dir, {}, function (err, files) {
      const schemas = files
      .map((file) => {
        try {
          const data = require('../' + file)
          return data
        } catch (err) {
          return null
        }
      })
      .filter(x => x)
      .reduce((prev, d) => {
        const regex = /\/schemas\/(.*)/igm
        const matches = regex.exec(d.id)
        const name = matches && matches.length ? matches[1]: null
        if (!name) {
          return
        }
        prev[name] = d
        return prev
      }, {})

      resolve(schemas)
        
    })
  })
}


const schemas = readSchemasFromDir('**/schema/*.json')

class SchemaService extends SchemaServiceInterface {
  /*
   * Description: Returns a list of schemas
  **/
  async getSchemas () {
    return Promise.resolve(schemas.map(d => d.id))
  }
  /*
   * @params {string} schema_id: the id of the schema
   * Description: Returns a schema by id
  **/
  async getSchema ({ schema_id }) {
    return Promise.resolve(schemas[schema_id])
  }
}

// Export a new auth service
export default (options) => {
  return new SchemaService(options)
}
