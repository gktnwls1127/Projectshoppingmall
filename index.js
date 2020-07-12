const express = require("express");
const app = express();

const port = 5000;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./server/config/key");
const { auth } = require("./server/middleware/auth");
const { User } = require("./server/models/User");

//www url을 분석해서 가져올 수 있게 해주는 것
app.use(bodyParser.urlencoded({ extended: true }));
//json형식을 가져올 수 있게 해주는 것.
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

app.post("/api/users/register", (req, res) => {
  //회원가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/api/users/login", (req, res) => {
  if (req.body.profile) {
    User.findOne({ email: req.body.profile.id }, (err, user) => {
      if (err) return res.json({ success: false, err });
      if (user) {
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          //토큰을 저장한다. 어디에? 쿠키 or 로컬스토리지
          res
            .cookie("x_auth", user.token)
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
              .cookie("x_auth", user.token)
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
          message: "제공된 이메일에 해당되는 유저가 없습니다.",
        });
      }
      //유저가 존재하는 경우, 비밀번호가 맞는 비밀번호인지 확인.
      //method는 user model에서 만들어 주면 된다.
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });
        //비밀번호가 일치하는 경우 Token 생성
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          //토큰을 저장한다. 어디에? 쿠키 or 로컬스토리지
          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      });
    });
  }
});
//auth라는 미들웨어 추가
app.get("/api/users/auth", auth, (req, res) => {
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
//logout 구현 , token을 제거해줌으로서 더이상 인증 절차를 거칠 수 없게 하는 것.
//auth를 거치는 이유, login 된 상태에서 logout을 하는 것이기 때문.
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.use("/api/sns", require("./server/routes/sns"));

app.listen(port, () => console.log(`Example app Listening on port ${port}`));
