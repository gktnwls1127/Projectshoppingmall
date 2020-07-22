const express = require('express');
const router = express.Router();
const multer = require('multer');

const { SNSPost } = require('../models/SNSPosts');

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
	snsPost.save((err, post) => {
		if (err) res.status(400).json({ success: false, err });
		res.status(200).json({ success: true, post });
	});
});

router.post('/getProduct', (req, res) => {
	SNSPost.find()
		.populate('writer')
		.exec((err, posts) => {
			if (err) return res.status(400).json({ success: false, err });
			res.status(200).json({ success: true, posts });
		});
});

router.post('/upviews', (req, res) => {
	SNSPost.findOneAndUpdate(
		{ _id: req.body.id },
		{
			$inc: {
				views: 1,
			},
		},
		(err) => {
			if (err) res.json({ success: false, err });
			res.json({ success: true });
		}
	);
});

module.exports = router;
