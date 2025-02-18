const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  MSNV: { type: String, required: true },
  HoTenNV: { type: String, required: true },
  Password: { type: String, required: true },
  ChucVu: { type: String, required: true },
  DiaChi: { type: String, required: true },
  SoDienThoai: { type: String, required: true }, // Đảm bảo kiểu dữ liệu đúng
});

const Staff = mongoose.model('Staff', staffSchema, 'NhanVien');

module.exports = Staff;
