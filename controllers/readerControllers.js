const Reader = require('../models/Reader');

// Thêm nhân viên mới
module.exports.createReader = async (req, res) => {
    const { 
        MADOCGIA,
        HOLOT,
        TEN,
        NGAYSINH,
        PHAI,
        DIACHI,
        DIENTHOAI 
    } = req.body;

  // Kiểm tra dữ liệu yêu cầu
  if (!MADOCGIA || !HOLOT || !TEN || !DIENTHOAI) {
    return res.status(400).json({ message: 'Mã đọc giả, họ và tên và số điện thoại là bắt buộc.' });
  }

  try {
    // Kiểm tra xem có nhân viên nào tồn tại với MSNV này không
    const existingReader = await Reader.findOne({ MADOCGIA });
    if (existingReader) {
      return res.status(400).json({ message: 'Đọc giả đã tồn tại trong cơ sở dữ liệu.' });
    }

    // Tạo nhân viên mới
    const newReader = new Reader({
        MADOCGIA,
        HOLOT,
        TEN,
        NGAYSINH,
        PHAI,
        DIACHI,
        DIENTHOAI,
    });

    // Lưu đọc giả vào MongoDB
    await newReader.save();

    // Trả về phản hồi thành công
    res.status(201).send('Đọc giả đã được tạo thành công!');
  } catch (err) {
    console.error('Lỗi khi lưu đọc giả:', err);
    res.status(500).json({ message: err.message });
  }
};

// Lấy tất cả đọc giả
module.exports.getAllReader = async (req, res) => {
  try {
    const   readerList = await Reader.find();
    if (!readerList || readerList.length === 0) {
      return res.status(404).json({ message: 'Không có đọc giả nào trong cơ sở dữ liệu.' });
    }
    res.status(200).json(readerList);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách:', err.message);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách đọc giả.', error: err.message });
  }
};
