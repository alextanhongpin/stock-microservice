import glob from 'glob'

// The authentication interface
class SchemaServiceInterface {
  getSchemas () {
    throw new Error('SchemaServiceInterface: getSchemas is not implemented')
  }
  getSchema () {
    throw new Error('SchemaServiceInterface: getSchema is not implemented')
  }
}

// Compile static json files
const readSchemasFromDir = (dir) => {
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
        const regex = /\/schemas\/(.*)#$/igm
        const matches = regex.exec(d.id)
        const name = matches && matches.length ? matches[1] : null
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

let schemas = null

readSchemasFromDir('**/schema/*.json').then((value) => {
  schemas = value
})

class SchemaService extends SchemaServiceInterface {
  /*
   * Description: Returns a list of schemas
  **/
  async getSchemas () {
    return Promise.resolve(Object.values(schemas).map(d => d.id))
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
