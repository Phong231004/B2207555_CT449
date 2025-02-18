const express = require('express');
const router = express.Router();
const readerController = require('../controllers/readerControllers');  // Đảm bảo đường dẫn đúng

// Route POST để thêm đọc giả
router.post('/', readerController.createReader);
// Route POST để lấy tất cả các đọc giả có trong hệ thống
router.get('/', readerController.getAllReader);
// Kiểm tra mã Đọc Giả
router.get('/:MADOCGIA', async (req, res) => {
  try {
    const reader = await readerController.findOne({ MADOCGIA: req.params.MADOCGIA });
    if (!reader) {
      return res.status(404).json({ message: 'Đọc giả không tồn tại!' });
    }
    res.json(reader);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tìm kiếm đọc giả!' });
  }
});

module.exports = router;
