const mongoose = require('mongoose');

const readerSchema = new mongoose.Schema({
  MADOCGIA: { type: String, required: true },
  HOLOT: { type: String, required: true },
  TEN: { type: String, required: true },
  NGAYSINH: { type: Date, required: true },
  PHAI: { type: String, required: true },
  DIACHI: { type: String, required: true },
  DIENTHOAI: { type: String, required: true } // Đảm bảo kiểu dữ liệu đúng
});

const Reader = mongoose.model('Reader', readerSchema, 'DOCGIA');

module.exports = Reader;
