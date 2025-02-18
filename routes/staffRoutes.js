const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffControllers');  // Đảm bảo đường dẫn đúng

// Route POST để thêm nhân viên mới
router.post('/', staffController.createStaff);
// Route GET để lấy tất cả các nhân viên có trong hệ thống
router.get('/', staffController.getAllStaff);
// Kiểm tra mã Nhân Viên
router.get('/:MSNV', async (req, res) => {  // Đảm bảo đúng tên tham số: MSNV thay vì MANV
  try {
    const staff = await staffController.findOne({ MSNV: req.params.MSNV });
    if (!staff) {
      return res.status(404).json({ message: 'Nhân viên không tồn tại!' });
    }
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tìm kiếm nhân viên!' });
  }
});

module.exports = router;
