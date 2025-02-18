const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookControllers');  // Đảm bảo đường dẫn đúng

// Route POST để thêm sách mới
router.post('/', bookController.createBook);
// Route POST để lấy tất cả các loại sách có trong hệ thống
router.get('/', bookController.getAllBooks);
// Kiểm tra mã Sách
router.get('/:MASACH', async (req, res) => {
  try {
    const book = await bookController.findOne({ MASACH: req.params.MASACH });
    if (!book) {
      return res.status(404).json({ message: 'Sách không tồn tại!' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tìm kiếm sách!' });
  }
});

module.exports = router;