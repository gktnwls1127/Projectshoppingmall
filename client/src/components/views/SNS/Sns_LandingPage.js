import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Avatar, Row, Col, Typography } from 'antd';
import axios from 'axios';
import RenderImages from './sections/Sns_RenderImages';
import RenderText from './sections/RenderText';
import './Sns_LandingPage.scss';

const { Meta } = Card;
const { Title } = Typography;
//snapshots , name, text
function Sns_LandingPage() {
	const [posts, setPosts] = useState([]);
	const user = useSelector((state) => state.user.userData);
	const getPosts = (data) => {
		axios.post('/api/sns/getProduct').then((response) => {
			if (response.data.success) {
				setPosts(response.data.posts);
			}
		});
	};
	useEffect(() => {
		getPosts();
	}, []);
	console.log(posts);

	const renderProfileImage = (post) => {
		if (post && post.writer.image) {
			return `http://localhost:5000/${post.writer.image}`;
		} else {
			return 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg';
		}
	};

	const renderPosts = (posts) =>
		posts.map((post) => (
			<Col key={post._id} lg={6} xs={24}>
				<Card
					style={{
						width: 250,
						border: '2px solid #e8ebed',
						borderRadius: '20px',
					}}
					cover={<RenderImages snapshots={post.snapshots} id={post._id} />}
				>
					<Meta
						avatar={<Avatar src={renderProfileImage(post)} />}
						description={<RenderText post={post} />}
					/>
				</Card>
			</Col>
		));

	return (
		<div className="posts">
			<Title level={3} style={{ marginBottom: '3rem' }}>
				지금의 트렌드
			</Title>
			<Row gutter={[16, 32]}>{renderPosts(posts)}</Row>
		</div>
	);
}

export default Sns_LandingPage;
