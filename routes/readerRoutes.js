const express = require('express');
const router = express.Router();
const readerController = require('../controllers/readerControllers');  // Đảm bảo đường dẫn đúng

// Route POST để thêm đọc giả
router.post('/', readerController.createReader);
// Route POST để lấy tất cả các đọc giả có trong hệ thống
router.get('/', readerController.getAllReader);
// Kiểm tra mã Đọc Giả
router.get('/:MADOCGIA', readerController.checkReaderCode);
// Check đăng nhập
router.post('/login', readerController.checkReaderLogin);  // Sửa lại để là POST
module.exports = router;
