const express = require("express");
const router = express.Router();
const app = express();
const { SNSPost } = require("../models/SNSPosts");
const { User } = require("../models/User");

app.post("/upload", (res, req) => {});

module.exports = router;
