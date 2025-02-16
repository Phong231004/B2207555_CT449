const mongoose = require('mongoose');

// Định nghĩa schema cho sách
const bookSchema = new mongoose.Schema({
  MASACH: { type: String, required: true },
  TENSACH: { type: String, required: true },
  DONGIA: { type: Number, required: true },
  SOQUYEN: { type: Number, required: true },
  NHAXUATBAN: { type: String, required: true },
  MANXB: { type: String, required: true },
  TACGIA: { type: String, required: true }
});

// Khai báo model và liên kết với collection 'SACH' trong MongoDB
const Book = mongoose.model('Book', bookSchema, 'SACH');
module.exports = Book;
