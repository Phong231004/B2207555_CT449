const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
  MADOCGIA: { type: String, required: true },
  MASACH: { type: String, required: true },
  MSNV: { type: String, required: true },
  NGAYMUON: { type: Date, required: true },
  NGAYTRA: { type: Date, required: true }
});

const Transactions = mongoose.model('Transactions', transactionsSchema, 'THEODOIMUONSACH');

module.exports = Transactions;
