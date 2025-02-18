require('dotenv').config();  // Nạp các biến môi trường từ file .env

const connectDB = require('./config/database');  // Đảm bảo đúng đường dẫn đến file database.js
const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const readerRoutes = require('./routes/readerRoutes');
const staffRoutes = require('./routes/staffRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const publisherRoutes = require("./routes/publisherRoutes")


// Kết nối MongoDB
connectDB();
const app = express();
// Middleware để xử lý body request
app.use(express.json());  // Dành cho JSON
app.use(express.urlencoded({ extended: true }));  // Dành cho form data

// Cung cấp file tĩnh từ thư mục 'public'
app.use(express.static('public'));

// Sử dụng router cho các route
app.use('/api/books', bookRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/reader', readerRoutes);
app.use('/api/publisher', publisherRoutes);

// Cung cấp file HTML cho thêm dữ liệu
app.get('/Enter_additional_code/Enter_additionail_book_code', (req, res) => {
  res.sendFile(__dirname + '/public/Enter_additional_code/Enter_additionail_book_code.html');  // Đảm bảo đường dẫn đúng tới file index.html
});
app.get('/Enter_additional_code/Enter_additionail_staff_code', (req, res) => {
  res.sendFile(__dirname + '/public/Enter_additional_code/Enter_additionail_staff_code.html');  // Đảm bảo đường dẫn đúng tới file index.html
});
app.get('/Enter_additional_code/Enter_additionail_reader_code', (req, res) => {
  res.sendFile(__dirname + '/public/Enter_additional_code/Enter_additionail_reader_code.html');  // Đảm bảo đường dẫn đúng tới file index.html
});
app.get('/Enter_additional_code/Enter_additionail_publisher_code', (req, res) => {
  res.sendFile(__dirname + '/public/Enter_additional_code/Enter_additionail_publisher_code.html');  // Đảm bảo đường dẫn đúng tới file index.html
});
// Port
const PORT = process.env.PORT || 3000;  // Lấy cổng từ biến môi trường hoặc cổng mặc định

// Khởi động server và xử lý lỗi nếu có
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Không thể khởi động server trên cổng ${PORT}:`, err);
  } else {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
  }
});
