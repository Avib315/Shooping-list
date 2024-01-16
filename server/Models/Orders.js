const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  fullName: String,
  address: String,
  email: String,
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;