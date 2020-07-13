const express = require('express');
const router = express.Router();
const multer = require('multer');

const { SNSPost } = require('../models/SNSPosts');
const { User } = require('../models/User');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/sns');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname + '-' + Date.now());
	},
});

const upload = multer({ storage: storage });

router.post('/uploadImages', upload.single('files'), (req, res) => {
	res.status(200).json({ success: true, filePath: req.file.path });
});

router.post('/post', (req, res) => {
	const snsPost = new SNSPost(req.body);
	snsPost.save((err, doc) => {
		if (err) res.status(400).json({ success: false, err });
		res.status(200).json({ success: true });
	});
});

module.exports = router;
