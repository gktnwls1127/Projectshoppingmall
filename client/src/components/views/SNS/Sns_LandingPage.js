import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Avatar, Row, Col, Typography } from 'antd';
import axios from 'axios';
import RenderImages from './sections/Sns_RenderImages';
import './Sns_LandingPage.scss';


import Pageination from './sections/Pageination'

import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from '@ant-design/icons';
const { Meta } = Card;
const { Title } = Typography;
//snapshots , name, text
function Sns_LandingPage() {
	const [posts, setPosts] = useState([]);

	const [loading, setLoading] = useState(false);
	const [currnet, setcurrnet] = useState(1)
	const [postsPerPage, setPostPerPage] = useState(10)

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
		setLoading(false)
	}, []);


	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
	//Chage page
	const pageinate = (pageNumber) => setCurrentPage(pageNumber)



	const renderProfileImage = () => {
		if (user && user.image) {
			return `http://localhost:5000/${user.image}`;
		} else {
			return 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
		}
	};

	const renderPosts = (posts) =>
		posts.map((post) => (
			
			<Col key={post._id} lg={6} xs={24}>
				<Card
					style={{
						width: 250,
						border: '2px solid #e8ebed',
					}}
					cover={<RenderImages snapshots={post.snapshots} />}
					actions={[
						<SettingOutlined key="setting" />,
						<EditOutlined key="edit" />,
						<EllipsisOutlined key="ellipsis" />,
					]}
				>
					<Meta
						avatar={<Avatar src={renderProfileImage()} />}
						description={post.text}
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
			<Pageination postsPerPage={postsPerPage} totalPosts={posts.length} pageinate={pageinate}/>
		</div>
	);
}

export default Sns_LandingPage;
