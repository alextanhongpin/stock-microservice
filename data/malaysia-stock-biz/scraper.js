const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')


function scrape ($) {
  let data = []
    $('#MainContent_tStock').find('tr').each((i, e) => {
    console.log(i, e)
    // Only take even number
    if (i % 3 === 0) {
      const obj = {
        name: $(e).find('td').eq(1).text().split('(')[0].trim(),
        ticker: $(e).find('td').eq(1).text().split('(')[1].replace(')', '').trim(),
        category: $(e).find('td').eq(2).text().trim(),
        company: $(e).next().find('td').eq(1).text().trim()
      }
      data.push(obj)
    }
  })

  return JSON.stringify(data)
}

// Load data for the following initials
'abcdefghijklmnopqrstuvwxyz'.split('').map((a) => {
  load(a)
})


function load (alphabet) {
  console.log('Scraping...' + alphabet)
  request('http://www.malaysiastock.biz/Listed-Companies.aspx?type=A&value=' + alphabet, function (error, response, html) {
   if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html)
      const data = scrape($)
      const json = JSON.stringify(data)
      fs.writeFile('./data/malaysia-stock-biz/' + alphabet + '.json', json, 'utf8', () => {
        console.log('successfully wrote to json')
      })
    }
  })
}
