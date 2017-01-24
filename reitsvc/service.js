import reitsData from './data/all.json'

// The reit service interface
class ReitServiceInterface {
  getReits () {
    throw new Error('ReitServiceInterface: getReits is not implemented')
  }
}

class ReitService extends ReitServiceInterface {
  async getReits ({ query, sort }) {
    // Serve static data
    let mappedData = mapReits(reitsData)
    if (query) {
      const filteredData = mappedData.filter((data) => {
        return data.name.toLowerCase().indexOf(query) !== -1
      })
      return Promise.resolve({
        data: filteredData,
        _total: filteredData.length
      })
    } else {
      return Promise.resolve({
        data: mappedData,
        _total: mappedData.length
      })
    }
  }
}

const mapReit = (reit) => {
  return {
    assets_type: reit['Assets Type'],
    dpu: reit['DPU (sen)'],
    nav: reit['NAV (RM)'],
    period: reit['Period'],
    price: reit['Price (RM)'],
    name: reit['REIT'],
    yield: reit['Yield']
  }
}
const mapReits = (reits) => {
  return reits.map(mapReit)
}

export default (options) => {
  return new ReitService(options)
}
