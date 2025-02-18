const Transaction = require('../models/Transaction');

// Thêm thông tin mới
module.exports.createTransaction = async (req, res) => {
  const { MADOCGIA, MASACH, MSNV, NGAYMUON, NGAYTRA } = req.body;

  // Kiểm tra dữ liệu yêu cầu
  if (!MADOCGIA || !MASACH || !MSNV) {
    return res.status(400).json({ message: 'Mã đọc giả, mã sách và mã nhân viên là bắt buộc.' });
  }

  try {
    // Tạo TTQL mới
    const newTransaction = new Transaction({
      MADOCGIA,
      MASACH,
      MSNV,
      NGAYMUON,
      NGAYTRA,
    });

    // Lưu TTQL vào MongoDB
    await newTransaction.save();

    // Trả về phản hồi thành công
    res.status(201).send('Thông tin đã được tạo thành công!');
  } catch (err) {
    console.error('Lỗi khi lưu thông tin:', err);
    res.status(500).json({ message: err.message });
  }
};

// Lấy tất cả TTQL
module.exports.getAllTransaction = async (req, res) => {
  try {
    const transactionList = await Transaction.find();
    if (!transactionList || transactionList.length === 0) {
      return res.status(404).json({ message: 'Không có thông tin nào trong cơ sở dữ liệu.' });
    }
    res.status(200).json(transactionList);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách:', err.message);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách thông tin quản lý mượn sách.', error: err.message });
  }
};
