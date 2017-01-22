// _.templateSettings = {
//   interpolate: /\{\{(.+?)\}\}/g
// }

const createButton = $('#create')
const watchlistView = $('#watchlist')
const alertView = $('#alert')
const stockSymbolsInput = $('input[name=stocks_symbol]')
const autocompleteList = $('.autocomplete-results')
const detailView = $('#detail')

let searchTimeout = null
// Yeah, global is bad :p
let ws = null

const Model = {
  // Description: An array of stock symbols
  // E.g. ['AAPL', 'TIMECOM']
  // @returns {[]string}
  getWatchlist () {
    const watchlist = window.localStorage.watchlist
    if (!watchlist) {
      return []
    }
    return watchlist.split(',')
  },
  // @params symbols {[]string}
  addToWatchlist (symbols) {
    const watchlist = this.getWatchlist()
    const newWatchlist = watchlist.concat(symbols)
    window.localStorage.watchlist = [...new Set(newWatchlist)]
  },
  // @symbols {string}
  removeFromWatchList (symbol) {
    const watchlist = this.getWatchlist()
    const filteredList = watchlist.filter((sym) => {
      return sym !== symbol
    })
    window.localStorage.watchlist = filteredList

    // Update websocket
    if (ws) {
      ws.send(JSON.stringify({ symbols: Model.getWatchlist() }))
    }
  },
  search (query) {
    return new Promise((resolve, reject) => {
      if (searchTimeout) {
        window.clearTimeout(searchTimeout)
      }
      searchTimeout = window.setTimeout(() => {
        if (!this.request) {
          this.request = fetch('/api/v1/quotes/stock-biz')
          .then((body) => {
            return body.json()
          })
        }

        this.request.then((json) => {
          const filtered = json
          .map(m => {
            m.search = Object.values(m).join(' ')
            return m
          })
          .filter(d => d.search.toLowerCase().indexOf(query.toLowerCase()) !== -1)
          return filtered.map(m => m.ticker)
        }).then((data) => {
          resolve(data)
        })
      }, 500)
    })
  }
}
const View = {
  alert: _.template(`
    <div class="alert alert-success alert-dismissible" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong><%=message%></strong>
    </div>
  `),
  watchlist: _.template(`
    <table class="table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <% _.each(stocks, function (stock) { %>
          <tr data-id="row-<%= stock%>">
            <td><%= stock %></td>
            <td>
              <button class="btn btn-danger js-remove-symbol" data-symbol="<%=stock%>">Delete</button>
            </td>
          <tr>
        <% }) %>
      </tbody>
    </table>
  `),
  autocompleteList: _.template(`
    <% _.each(results, function (result) { %>
      <div class="autocomplete-results__item"><%= result %></div>
    <% }) %>
  `),
  detailList: _.template(`
    <% _.each(stocks, function (stock) { %>
      <div>
        <p><%= stock.name %> (<%= stock.symbol %>)
          <h4><%= stock.previous_close_price %> </h4>
          <% var isDanger = stock.change_percent.indexOf('-') !== -1%>
          <span class="label <%= isDanger ? 'label-danger' : 'label-success' %> pull-right"><%= stock.change_percent %>%</span>
        </p>
      </div>
    <% }) %>    
  `)
}

const Controller = {
  updateWatchlist () {
    const watchlist = Model.getWatchlist()
    const htmlString = View.watchlist({
      stocks: watchlist
    })
    // Render template
    watchlistView.html(htmlString)
    // Bind events
    $('.js-remove-symbol').click((evt) => {
      const symbol = evt.currentTarget.dataset.symbol
      // Update model
      Model.removeFromWatchList(symbol)
      // Update view
      $(`[data-id="row-${symbol}"]`).remove()
    })
  },
  bindAutocomplete (cb) {
    $('.autocomplete-results__item').click((evt) => {
      const value = $(evt.currentTarget).text()
      // Empty the html
      $('.autocomplete-results').html('')
      cb(value)
    })
  },
  renderAutocompleteList (html) {
    $('.autocomplete-results').html(html)
  }
}

// Fetch data from localStorage first
function componentWillMount () {
  Controller.updateWatchlist()
}

function componentDidMount () {
  // Listen to button click event
  createButton.click((evt) => {
    // Get the list of new symbols
    const symbols = stockSymbolsInput.val().split(',')
    Model.addToWatchlist(symbols)
    Controller.updateWatchlist()
    alertView.html(View.alert({ message: `${symbols.join(', ')} have been added to your watchlist!` }))

    $('.alert').alert()

    // Disabled the button after the user has added a new item
    createButton.prop('disabled', true)

    // Clear input
    stockSymbolsInput.val('')

    // Add entry to WebSocket
    if (ws) {
      ws.send(JSON.stringify({ symbols: Model.getWatchlist() }))
    }
  })

  // Listen to the search query
  stockSymbolsInput.keyup((evt) => {
    const query = evt.currentTarget.value.trim()
    createButton.prop('disabled', true)
    if (!query.length) {
      autocompleteList.hide()
      window.clearTimeout(searchTimeout)
      return
    }
    Model.search(query).then((data) => {
      if (data.length) {
        autocompleteList.show()
        // Render the autocomplete list
        const htmlString = View.autocompleteList({
          results: data
        })
        Controller.renderAutocompleteList(htmlString)

        // Action: Select item from autocomplete list
        Controller.bindAutocomplete((value) => {
          // Allow user to click the button only after they have selected from the list
          createButton.prop('disabled', false)
          // Set the value
          stockSymbolsInput.val(value)
          // Hide the list
          autocompleteList.hide()
        })
      } else {
        autocompleteList.hide()
        createButton.prop('disabled', true)
      }
    })
  })
}

function render () {

}

function initWebSocket () {
  if (window.WebSocket) {
    console.log('websocket supported')
  } else {
    window.alert('websocket unsupported')
  }
  ws = new WebSocket('ws://localhost:8080')

  ws.onopen = (e) => {
    console.log('connection to server opened')
    ws.send(JSON.stringify({ symbols: Model.getWatchlist() }))
  }

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data)
    const stocks = data.stocks

    console.log('websocket:received data:', data)
    // Update details
    detailView.html(View.detailList({ stocks }))
  }

  ws.onerror = (e) => {
    console.log('Websocket failure, err', err)
  }

  ws.onclose = (e) => {
    console.log(e.reason + ' ' + e.code)
    // render something on the ui...
  }
}

function start () {
  componentWillMount()
  componentDidMount()
  render()
  initWebSocket()
}

start()
