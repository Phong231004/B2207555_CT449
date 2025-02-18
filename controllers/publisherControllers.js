const Publisher = require('../models/Publisher');

// Thêm NXB mới
module.exports.createPublisher = async (req, res) => {
  const { MANXB, TENNXB, DIACHI } = req.body;

  // Kiểm tra dữ liệu yêu cầu
  if (!MANXB || !TENNXB || !DIACHI) {
    return res.status(400).json({ message: 'Mã NXB, Tên NXB và Địa chỉ là bắt buộc.' });
  }

  try {
    // Kiểm tra xem có NXB nào tồn tại với MSNV này không
    const existingPublisher = await Publisher.findOne({ MANXB });
    if (existingPublisher) {
      return res.status(400).json({ message: 'NXB đã tồn tại trong cơ sở dữ liệu.' });
    }

    // Tạo NXB mới
    const newPublisher = new Publisher({
      MANXB,
      TENNXB,
      DIACHI,
    });

    // Lưu NXB vào MongoDB
    await newPublisher.save();

    // Trả về phản hồi thành công
    res.status(201).send('NXB đã được tạo thành công!');
  } catch (err) {
    console.error('Lỗi khi lưu NXB:', err);
    res.status(500).json({ message: err.message });
  }
};

// Lấy tất cả NXB
module.exports.getAllPublisher = async (req, res) => {
  try {
    const publisherList = await Publisher.find();
    if (!publisherList || publisherList.length === 0) {
      return res.status(404).json({ message: 'Không có NXB nào trong cơ sở dữ liệu.' });
    }
    res.status(200).json(publisherList);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách:', err.message);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách NXB.', error: err.message });
  }
};
