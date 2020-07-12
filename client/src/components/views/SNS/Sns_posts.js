import React, { useState, useCallback } from "react";
import { Form, Button, Input } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import "./Sns_posts.scss";
const { TextArea } = Input;

function Sns_posts() {
  const [text, setText] = useState("");
  const [snapshots, setSnapshots] = useState([]);
  const textHandler = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [text]
  );

  const imageSelect = () => {
    const image = document.querySelector("#image");
    image.click();
  };

  const uploadHandler = (e) => {};

  const onSubmitHandler = () => {};

  return (
    <div>
      <div className="post_container">
        <div className="uploadFile">
          <input
            type="file"
            onChange={uploadHandler}
            accept="image/*"
            multiple
            id="image"
            style={{ display: "none" }}
          />
          <Button onClick={imageSelect}>이미지 선택</Button>
          <br />
          <br />
          <Form onFinish={onSubmitHandler}>
            <label htmlFor="description">
              <h2>내용</h2>
            </label>
            <TextArea id="description" value={text} onChange={textHandler} />
            <Button style={{ marginTop: "20px" }}>
              <UploadOutlined /> 포스팅 하기
            </Button>
          </Form>
        </div>

        <div clasesName="description_post"></div>
      </div>
    </div>
  );
}

export default Sns_posts;
