// Setup mongoose
import mongoose, { connection } from 'mongoose'
mongoose.Promise = global.Promise

const db = mongoose.createConnection(process.env.MONGO_URI)

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', () => {
  console.log('connected to mongodb')
})

export default db
