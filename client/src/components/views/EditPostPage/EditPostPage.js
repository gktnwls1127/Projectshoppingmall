import React, { useEffect, useState } from 'react';
import { Form, Button, Input } from 'antd';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const { TextArea } = Input;

function EditPostPage(props) {
	let postinfo = props.match.params.info;
	const [Edit, setEdit] = useState('');
	const [EditPost, setEditPost] = useState([]);
	const [Test, setTest] = useState([]);
	const [Previous, setPrevious] = useState('');

	useEffect(() => {
		let body = {
			edit: postinfo,
		};
		getInfo(body);
	}, []);

	const getInfo = (body) => {
		axios.post('/api/sns/edit', body).then((response) => {
			if (response.data.success) {
				setEditPost(response.data.posts);
				setTest(response.data.posts[0]);
				setEdit(response.data.posts[0].text);
				setPrevious(response.data.posts[0].text);
			} else {
				alert('Post를 가져오는데 실패했습니다.');
			}
		});
	};

	const textChangeHandler = (event) => {
		setEdit(event.currentTarget.value);
	};

	const updateButton = () => {
		let body = {
			previous: Previous,
			newest: Edit,
			writer: Test.writer._id,
		};
		testChange(body);
	};

	const testChange = (body) => {
		axios.post('/api/sns/editText', body).then((response) => {
			if (response.data.success) {
				setEditPost(response.data.posts);
				setEdit(response.data.posts.text);
				alert('수정하기가 성공했습니다.');
				props.history.push('/sns');
			} else {
				alert('수정하기가 실패했습니다.');
			}
		});
	};

	return (
		<div>
			<div className="post_container">
				<div className="description">
					<Form>
						<label htmlFor="description">
							<h2>내용</h2>
						</label>
						<TextArea onChange={textChangeHandler} value={Edit} />
						<Button onClick={updateButton}>수정하기</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default withRouter(EditPostPage);
