// model.js

// Dependencies
import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'
mongoose.plugin(timestamps, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
// Database
import db from '../common/database.js'

const StockSchema = new Schema({
  ticker: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number
  },
  unit: {
    type: Number,
    min: 0
  },
  state: {
    type: String,
    enum: ['buy', 'sold', 'hold']
  }
})

StockSchema.plugin(timestamps)
StockSchema.static.toPercent = (a, b) => {
  return (a / b * 100).toFixed(2)
}

StockSchema.methods.calculatePrice = function () {
  return this.unit * this.price_bought
}
StockSchema.methods.calculateDifference = function (currentPrice) {
  const priceBought = this.calculatePrice()
  return currentPrice - priceBought
}

let Stock
try {
  Stock = db.model('Stock')
} catch (error) {
  Stock = db.model('Stock', StockSchema)
}
export default Stock
