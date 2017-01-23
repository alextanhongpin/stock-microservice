import elasticsearch from 'elasticsearch'

const bonsai_url = process.env.BONSAI_URL
const client = new elasticsearch.Client({
  host: bonsai_url,
  log: 'trace' 
})

// Test the connection...
client.ping({
  requestTimeout: 30000,
  hello: 'elasticsearch'
}, (error) => {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
})

client.search({
  q: 'rsi'
}).then((body) => {
  const hits = body.hits.hits
}, (error) => {
  console.trace(error.message)
})