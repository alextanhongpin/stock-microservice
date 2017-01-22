// _.templateSettings = {
//   interpolate: /\{\{(.+?)\}\}/g
// }

const createButton = $('#create')
const watchlistView = $('#watchlist')
const stockSymbolsInput = $('input[name=stocks_symbol]')
const navView = $('nav')

// Fetch data from localStorage first
function componentWillMount () {
  const watchlist = window.localStorage.getItem('watchlist')
  if (!watchlist) {
    return
  } else {
  	const stocks = watchlist.split(',')
  	const template = _.template(`
  		<ul>
	  		<% _.each(stocks, function (stock) { %>
	  			<%= stock %>
	  		<% }) %>
  		<ul>
  	`)
  	console.log(template)
  	const htmlString = template({ stocks })
  	watchlistView.html(htmlString)
  }
}

function componentDidMount () {
  createButton.click((evt) => {
  	console.log(stockSymbolsInput.val())
    const symbols = stockSymbolsInput.val().split(',')

    const watchlist = window.localStorage.getItem('watchlist')
    let output = []
    if (watchlist) {
  		const stocks = watchlist.split(',')
  		output = stocks.concat(symbols).filter(x => x)
  	} else {
  		output = symbols
  	}
  	window.localStorage.setItem('watchlist', output.join(','))

  	toastHelper(`${symbols.join(', ')} have been added to your watchlist!`)
  })
}

function render () {

}

function toastHelper (message) {
	 navView.html(message)

  	window.setTimeout(() => {
  		navView.html('')
  	}, 4000)
}

function start () {
  componentWillMount()
  componentDidMount()
  render()
}

start()
