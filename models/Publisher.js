const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
  MANXB: { type: String, required: true },
  TENNXB: { type: String, required: true },
  DIACHI: { type: String, required: true },

});

const Publisher = mongoose.model('publisher', publisherSchema, 'NHAXUATBAN');

module.exports = Publisher;
