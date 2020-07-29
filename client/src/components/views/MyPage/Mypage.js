import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';

import { withRouter } from 'react-router-dom';
import { Card, Avatar, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import RenderImages from './sections/RenderImage';
import RenderText from './sections/RenderText';
import './Mypage.scss';

const { Meta } = Card;
function Mypage(props) {
	const user = useSelector((state) => state.user.userData);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (user) {
			axios.get(`/api/sns/getsnsposts?id=${user._id}`).then((response) => {
				if (response.data.success) {
					setPosts(response.data.posts);
				} else {
					alert('포스트 불러오기에 실패했습니다.');
				}
			});
		}
	}, [user]);

	const renderImage = () => {
		if (user && user.image) {
			return <img src={`http://localhost:5000/${user.image}`} />;
		} else {
			return (
				<img
					src={`https://1sfj1635wrts49n9bz3kpi6y-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/no-image-found.png`}
				/>
			);
		}
	};

	const loadUpdatePage = () => {
		props.history.push('/update');
	};

	const renderProfileImage = (post) => {
		if (post && post.writer.image) {
			return `http://localhost:5000/${post.writer.image}`;
		} else {
			return 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg';
		}
	};

	const renderPosts = () =>
		posts.map((post) => (
			<Col key={post._id} lg={6} xs={24}>
				<Card
					style={{
						width: 250,
						border: '2px solid #e8ebed',
						borderRadius: '20px',
					}}
					cover={<RenderImages post={post} />}
				>
					<Meta
						avatar={<Avatar src={renderProfileImage(post)} />}
						description={<RenderText post={post} />}
					/>
				</Card>
			</Col>
		));

	return (
		<div className="container">
			<div className="list_container">
				<div className="profile_image">{renderImage()}</div>
				<div className="userInfo">
					{user && <h1>{`${user.name}(${user.email})`}</h1>}
				</div>
				{/* 추후에 활동, 팔로잉 추가 */}
				<div className="update_info">
					<button onClick={loadUpdatePage}>
						<EditOutlined />
						수정하기
					</button>
				</div>
				<div style={{display: 'flex'}}>
				<a href="/shoppingmall/history">주문내역</a>
				</div>
			</div>
			<div className="user_posts">
				<h2>내 포스트</h2>
				<Row gutter={[16, 32]}>{renderPosts(posts)}</Row>
			</div>
		</div>
	);
}

export default withRouter(Mypage);
