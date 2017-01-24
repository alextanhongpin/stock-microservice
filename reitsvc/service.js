import reitsData from './data/all.json'

// The reit service interface
class ReitServiceInterface {
  getReits () {
    throw new Error('ReitServiceInterface: getReits is not implemented')
  }
}

class ReitService extends ReitServiceInterface {
  async getReits () {
    // Serve static data
    return Promise.resolve(reitsData)
  }
}

export default (options) => {
  return new ReitService(options)
}
