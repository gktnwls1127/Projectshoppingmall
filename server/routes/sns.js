const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middleware/auth');
const clearCache = require('../middleware/clearCache');
const { SNSPost } = require('../models/SNSPosts');
const { SNSComment } = require('../models/SNSComment');
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
router.post('/post', clearCache, (req, res) => {
    const snsPost = new SNSPost(req.body);
    snsPost.save((err, post) => {
        if (err) res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, post });
    });
});
router.get('/getposts', auth, async (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    const posts = await SNSPost.find()
        .skip(skip)
        .limit(limit)
        .populate('writer')
        .cache({
            key: req.user._id,
        });
    res.status(200).json({ success: true, posts });
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
router.get('/getsnsposts', (req, res) => {
    SNSPost.find({ writer: req.query.id })
        .populate('writer')
        .exec((err, posts) => {
            if (err) res.json({ success: false, err });
            res.status(200).json({ success: true, posts });
        });
});
router.post('/addcomment', (req, res) => {
    const snsComent = new SNSComment(req.body);
    snsComent.save((err, comment) => {
        if (err) res.json({ success: false, err });
        res.status(200).json({ success: true });
    });
});
router.get('/getcomments', (req, res) => {
    SNSComment.find({ post: req.query.id })
        .populate('writer')
        .exec((err, comments) => {
            if (err) res.json({ success: false, err });
            else res.status(200).json({ success: true, comments });
        });
});
module.exports = router;