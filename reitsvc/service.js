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
    const mappedData = mapReits(reitsData)
    return Promise.resolve({
      data: mappedData,
      _total: mappedData.length
    })
  }
}

const mapReit = (reit) => {
  return {
    assets_type: reit['Assets Type'],
    dpu: reit['DPU (sen)'],
    nav: reit['NAV'],
    period: reit['Period'],
    price: reit['Price'],
    name: reit['REIT'],
    yield: reit['Yield'],
  }
}
const mapReits = (reits) => {
  return reits.map(mapReit)
}

export default (options) => {
  return new ReitService(options)
}
