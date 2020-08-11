import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import sanitize from 'sanitize-html';
import axios from 'axios';

// import LikeDislikes from './LikeDislikes'

function RenderDescription(props) {
	const user = useSelector((state) => state.user.userData);
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState([]);
	const [update, setUpdate] = useState(false);
	useEffect(() => {
		axios.get(`/api/sns/getcomments?id=${props.post._id}`).then((response) => {
			if (response.data.success) {
				setComments(response.data.comments);
			} else {
				alert('댓글 로드에 실패했습니다.');
			}
		});
	}, [update]);
	const renderProfileImage = () => {
		if (props.post && props.post.writer.image) {
			return `http://localhost:5000/${props.post.writer.image}`;
		} else {
			return 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg';
		}
	};

	const renderPostUser = () => (
		<div className="post_user_container">
			<div className="post_user_image">
				<img
					style={{ width: '40px', height: '40px' }}
					src={renderProfileImage()}
					alt="게시자 프로필사진"
				/>
			</div>
			<div className="post_user_name">
				<h4>{props.post.writer.name}</h4>
			</div>
			<div
				className="post_text"
				dangerouslySetInnerHTML={renderText(props.post.text)}
			></div>
		</div>
	);
	const renderText = (text) => {
		let preText = text.split(' ');
		let postingText = '';

		preText.forEach((content) => {
			if (typeof content !== 'undefined') {
				if (content.charAt(0) === '#') {
					postingText += `<a>${content} </a>`;
				} else {
					postingText += content + ' ';
				}
			}
		});
		return { __html: sanitize(postingText) };
	};
	const commentHandler = (e) => {
		setComment(e.target.value);
	};
	const submitHandler = (e) => {
		e.preventDefault();
		let data = {
			writer: user._id,
			post: props.post._id,
			comment,
		};
		axios.post('/api/sns/addcomment', data).then((response) => {
			if (response.data.success) {
				setComment('');
				setUpdate(!update);
			} else {
				alert('댓글 생성에 실패했습니다.');
			}
		});
	};

	const commentsRender = () => {
		return comments.map((comment) => (
			<div key={comment._id}>
				<img
					style={{ width: '50px', height: '50px' }}
					src={`http://localhost:5000/${comment.writer.image}`}
					alt="유저이미지"
				/>
				<h3>{comment.writer.name}</h3>
				<p>{comment.comment}</p>
			</div>
		));
	};

	return (
		<div className="description_container">
			<div className="post_info">
				<div className="post_user_info">{renderPostUser()}</div>
				<div className="post_description"></div>
			</div>
			<div className="comments">
				<div className="comments_input">
					<form onSubmit={submitHandler}>
						<input type="text" value={comment} onChange={commentHandler} />
						<br />
						<button type="submit">댓글달기</button>
					</form>
				</div>
				<div className="comments_from_user">{commentsRender()}</div>
			</div>
		</div>
	);
}

export default RenderDescription;
