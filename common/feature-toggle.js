// common/feature-toggle.js

export default (app) => {
  return {
    register: ({ service, name, enabled }) => {
      if (enabled) {
        app
        .use(service.routes())
        .use(service.allowedMethods())  
      }
      console.log(`the feature ${name} is ${enabled ? "enable" : "disabled"}`)
    }
  }
}