const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisherControllers');  // Đảm bảo đường dẫn đúng

// Route POST để thêm NXB mới
router.post('/', publisherController.createPublisher);
// Route GET để lấy tất cả các loại NXB có trong hệ thống
router.get('/', publisherController.getAllPublisher);

module.exports = router;
