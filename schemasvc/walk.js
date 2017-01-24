var glob = require("glob")

// options is optional
glob("**/schema/*.json", {}, function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.

    const output = files.map((file) => {
        
        try {
            const data = require('../' + file)
            return data
        } catch (err) {
            return null
        }
    }).filter(x => x)

    const schemas = output.reduce((prev, d) => {
        const regex = /\/schemas\/(.*)/igm
        const matches = regex.exec(d.id)
        console.log(matches)
        const name = matches && matches.length ? matches[1]: null
        if (!name) {
            return
        }
        prev[name] = d
        return prev
    }, {})

    console.log(schemas)
    
})