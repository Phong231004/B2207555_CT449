const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookControllers');  // Đảm bảo đường dẫn đúng

// Route POST để thêm sách mới
router.post('/', bookController.createBook);
// Route POST để lấy tất cả các loại sách có trong hệ thống
router.get('/', bookController.getAllBooks);
module.exports = router;
