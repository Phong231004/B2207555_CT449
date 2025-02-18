const express = require('express');
const router = express.Router();
const readerController = require('../controllers/readerControllers');  // Đảm bảo đường dẫn đúng

// Route POST để thêm sách mới
router.post('/', readerController.createReader);
// Route POST để lấy tất cả các loại sách có trong hệ thống
router.get('/', readerController.getAllReader);
module.exports = router;
