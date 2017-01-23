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
}, function (err) {
  if (err) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
})