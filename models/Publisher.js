const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
  MANXB: { type: String, required: true, unique: true }, // Add unique constraint
  TENNXB: { type: String, required: true },
  DIACHI: { type: String, required: true },
});

const Publisher = mongoose.model('Publisher', publisherSchema, 'NHAXUATBAN');

module.exports = Publisher;
