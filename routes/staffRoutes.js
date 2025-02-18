const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffControllers');  // Đảm bảo đường dẫn đúng

// Route POST để thêm sách mới
router.post('/', staffController.createStaff);
// Route POST để lấy tất cả các loại sách có trong hệ thống
router.get('/', staffController.getAllStaff);
module.exports = router;
