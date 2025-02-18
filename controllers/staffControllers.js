const Staff = require('../models/Staff');

// Thêm nhân viên mới
module.exports.createStaff = async (req, res) => {
  const { MSNV, HoTenNV, Password, ChucVu, DiaChi, SoDienThoai } = req.body;

  // Kiểm tra dữ liệu yêu cầu
  if (!HoTenNV || !Password || !SoDienThoai) {
    return res.status(400).json({ message: 'HoTenNV, Password và SoDienThoai là bắt buộc.' });
  }

  try {
    // Kiểm tra xem có nhân viên nào tồn tại với MSNV này không
    const existingStaff = await Staff.findOne({ MSNV });
    if (existingStaff) {
      return res.status(400).json({ message: 'Nhân viên đã tồn tại trong cơ sở dữ liệu.' });
    }

    // Tạo nhân viên mới
    const newStaff = new Staff({
      MSNV,
      HoTenNV,
      Password,
      ChucVu,
      DiaChi,
      SoDienThoai,
    });

    // Lưu nhân viên vào MongoDB
    await newStaff.save();

    // Trả về phản hồi thành công
    res.status(201).send('Nhân viên đã được tạo thành công!');
  } catch (err) {
    console.error('Lỗi khi lưu nhân viên:', err);
    res.status(500).json({ message: 'Lỗi hệ thống: ' + err.message });
  }
};

// Lấy tất cả nhân viên
module.exports.getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find();
    if (!staffList || staffList.length === 0) {
      return res.status(404).json({ message: 'Không có nhân viên nào trong cơ sở dữ liệu.' });
    }
    res.status(200).json(staffList);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách:', err.message);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách nhân viên.', error: err.message });
  }
};

// Tìm nhân viên theo mã
module.exports.findOne = async (query) => {
  return await Staff.findOne(query);
};
