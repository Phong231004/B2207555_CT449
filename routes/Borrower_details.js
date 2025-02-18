const express = require('express');
const Reader = require('../models/Reader');
const Transactions = require('../models/Transaction');
const Book = require('../models/Book');
const Publisher = require('../models/Publisher');
const Staff = require('../models/Staff');

const router = express.Router();

// API để lấy thông tin người mượn sách kèm các chi tiết
router.get('/borrower-details', async (req, res) => {
  const MADOCGIA = req.query.MADOCGIA;  // Sử dụng query string thay vì params để dễ dàng sử dụng

  try {
    // Tìm đọc giả theo mã
    const reader = await Reader.findOne({ MADOCGIA });
    if (!reader) {
      return res.status(404).json({ message: 'Không tìm thấy người đọc' });
    }

    // Tìm tất cả giao dịch của đọc giả
    const transactions = await Transactions.find({ MADOCGIA });

    // Lấy thông tin sách, nhân viên và nhà xuất bản cho từng giao dịch
    const detailedInfo = await Promise.all(transactions.map(async (transaction) => {
      const book = await Book.findOne({ MASACH: transaction.MASACH });
      const publisher = await Publisher.findOne({ MANXB: book.MANXB });
      const staff = await Staff.findOne({ MSNV: transaction.MSNV });

      return {
        MADOCGIA: reader.MADOCGIA,
        HOTEN: `${reader.HOLOT} ${reader.TEN}`,
        NGAYSINH: reader.NGAYSINH,
        PHAI: reader.PHAI,
        DIACHI: reader.DIACHI,
        DIENTHOAI: reader.DIENTHOAI,
        MASACH: book ? book.MASACH : 'Không có thông tin',
        TENSACH: book ? book.TENSACH : 'Không có thông tin',
        DONGIA: book ? book.DONGIA : 'Không có thông tin',
        SOQUYEN: book ? book.SOQUYEN : 'Không có thông tin',
        NAMXUATBAN: book ? book.NHAXUATBAN : 'Không có thông tin',
        MANXB: book ? book.MANXB : 'Không có thông tin',
        TENNXB: publisher ? publisher.TENNXB : 'Không có thông tin',
        TACGIA: book ? book.TACGIA : 'Không có thông tin',
        MSNV: staff ? staff.MSNV : 'Không có thông tin',
        HOTENNV: staff ? staff.HoTenNV : 'Không có thông tin',
        CHUCVU: staff ? staff.ChucVu : 'Không có thông tin',
        DIACHI_NV: staff ? staff.DiaChi : 'Không có thông tin',
        SODIENTHOAI: staff ? staff.SoDienThoai : 'Không có thông tin',
      };
    }));

    res.json(detailedInfo);
  } catch (error) {
    console.error('Lỗi khi lấy thông tin:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin.' });
  }
});

module.exports = router;
