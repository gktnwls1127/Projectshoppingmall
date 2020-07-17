const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middleware/auth');
const { User } = require('../models/User');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/user');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname + '-' + Date.now());
	},
});

const upload = multer({ storage: storage });

router.post('/register', (req, res) => {
	//회원가입 할 때 필요한 정보들을 client에서 가져오면
	// 그것들을 데이터베이스에 넣어준다.
	const user = new User(req.body);
	user.save((err, userInfo) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({ success: true });
	});
});

router.post('/login', (req, res) => {
	if (req.body.profile) {
		User.findOne({ email: req.body.profile.id }, (err, user) => {
			if (err) return res.json({ success: false, err });
			if (user) {
				user.generateToken((err, user) => {
					if (err) return res.status(400).send(err);
					//토큰을 저장한다. 어디에? 쿠키 or 로컬스토리지
					res
						.cookie('x_auth', user.token)
						.status(200)
						.json({ loginSuccess: true, userId: user._id });
				});
			} else {
				const user = new User({ email: req.body.profile.id });
				user.save((err, userInfo) => {
					if (err) return res.json({ success: false, err });
					user.generateToken((err, user) => {
						if (err) return res.status(400).send(err);
						//토큰을 저장한다. 어디에? 쿠키 or 로컬스토리지
						res
							.cookie('x_auth', user.token)
							.status(200)
							.json({ loginSuccess: true, userId: user._id });
					});
				});
			}
		});
	} else {
		User.findOne({ email: req.body.email }, (err, user) => {
			if (!user) {
				return res.json({
					loginSuccess: false,
					message: '제공된 이메일에 해당되는 유저가 없습니다.',
				});
			}
			//유저가 존재하는 경우, 비밀번호가 맞는 비밀번호인지 확인.
			//method는 user model에서 만들어 주면 된다.
			user.comparePassword(req.body.password, (err, isMatch) => {
				if (!isMatch)
					return res.json({
						loginSuccess: false,
						message: '비밀번호가 틀렸습니다.',
					});
				//비밀번호가 일치하는 경우 Token 생성
				user.generateToken((err, user) => {
					if (err) return res.status(400).send(err);
					//토큰을 저장한다. 어디에? 쿠키 or 로컬스토리지
					res
						.cookie('x_auth', user.token)
						.status(200)
						.json({ loginSuccess: true, userId: user._id });
				});
			});
		});
	}
});

router.get('/auth', auth, (req, res) => {
	//여기 까지 미들웨어를 통과했다는 것은 Authentication 이 true라는 말.
	res.status(200).json({
		_id: req.user._id,
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		image: req.user.image,
	});
});

router.get('/logout', auth, (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).send({ success: true });
	});
});

router.post('/uploadImages', upload.single('files'), (req, res) => {
	res.status(200).json({ success: true, filePath: req.file.path });
});

router.post('/update', (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.body.id },
		{ email: req.body.email, name: req.body.name, image: req.body.image },
		(err, user) => {
			if (err) return res.json({ success: false, err });
			return res.status(200).json({ success: true, user });
		}
	);
});

router.post('/updatePassword', (req, res) => {
	User.findOne({ _id: req.body.id }, (err, user) => {
		if (err) return res.json({ success: false, err });
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) {
				return res.json({
					loginSuccess: false,
					message: '비밀번호를 잘못 입력했습니다.',
				});
			}

			User.updateOne(
				{ _id: user._id },
				{
					$set: {
						password: req.body.newPassword,
					},
				},
				(err, user) => {
					if (err) return res.json({ success: false, err });
					res.status(200).json({ success: true, user });
				}
			);
		});
	});
});

module.exports = router;