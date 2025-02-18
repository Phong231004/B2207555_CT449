const Book = require('../models/Book');

// Thêm sách mới
module.exports.createBook = async (req, res) => {
  const { MASACH, TENSACH, DONGIA, SOQUYEN, NHAXUATBAN, MANXB, TACGIA } = req.body;

  // Nếu SOQUYEN không có giá trị hoặc không phải là một số hợp lệ, gán mặc định là 1
  const quantity = SOQUYEN && !isNaN(SOQUYEN) && SOQUYEN > 0 ? SOQUYEN : 1;

  try {
    // Kiểm tra xem có sách nào đã tồn tại với MASACH này không
    const existingBook = await Book.findOne({ MASACH });
    if (existingBook) {
      return res.status(400).json({ message: 'Mã sách đã tồn tại trong cơ sở dữ liệu.' });
    }

    // Tạo sách mới nếu MASACH không trùng
    const newBook = new Book({
      MASACH, TENSACH, DONGIA, SOQUYEN: quantity, NHAXUATBAN, MANXB, TACGIA
    });

    // Lưu sách vào MongoDB trong bộ sưu tập 'SACH'
    await newBook.save();

    // Trả về phản hồi thành công
    res.status(201).send('Sách đã được tạo thành công!');
  } catch (err) {
    console.error('Lỗi khi lưu sách:', err);
    res.status(500).json({ message: err.message });
  }
};

// Lấy tất cả sách
module.exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (!books || books.length === 0) {
      return res.status(404).json({ message: 'Không có sách nào trong cơ sở dữ liệu.' });
    }
    res.status(200).json(books);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách:', err.message);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy sách.', error: err.message });
  }
};
// Tìm sách
module.exports.findOne = async (query) => {
  return await Book.findOne(query);
}