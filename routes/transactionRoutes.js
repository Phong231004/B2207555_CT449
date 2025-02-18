const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionControllers');  // Đảm bảo đường dẫn đúng

// Route POST để thêm sách mới
router.post('/', transactionsController.createTransaction);
// Route POST để lấy tất cả các loại sách có trong hệ thống
router.get('/', transactionsController.getAllTransaction);
module.exports = router;
