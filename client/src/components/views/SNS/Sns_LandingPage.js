import React, { useState, useEffect } from 'react';
import { Card, Avatar, Row, Col, Typography } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import RenderImages from './sections/Sns_RenderImages';
import RenderText from './sections/RenderText';
import Comment from './sections/Comment';
import './Sns_LandingPage.scss';
const { Meta } = Card;
const { Title } = Typography;
const Sns_LandingPage = () => {
    const [posts, setPosts] = useState([]);
    const limit = 8;
    let skip;
    const getPosts = () => {
        axios
            .get(`/api/sns/getposts?skip=${skip} &limit=${limit}`)
            .then((response) => {
                if (response.data.success) {
                    if (response.data.posts) {
                        setPosts((prev) => [...prev].concat(response.data.posts));
                    }
                }
            })
            .catch((e) => {
                alert(e);
            });
    };
    const infiniteScroll = () => {
        let scrollHeight = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight
        );
        let scrollTop = Math.max(
            document.documentElement.scrollTop,
            document.body.scrollTop
        );
        let clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight === scrollHeight) {
            skip = skip + limit;
            getPosts();
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', infiniteScroll, true);
        skip = 0;
        getPosts();
    }, []);
    const renderProfileImage = (post) => {
		
        if (post && post.writer.image) {
            return `http://localhost:5000/${post.writer.image}`;
        } else {
            return 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg';
        }
    };
	const renderPosts = (posts) =>
	posts.map((post) => {
		if(post && post.writer){
			return(

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
				<Comment post={post} />
			</Card>
		</Col>
		)
		}
	});
    return (
		<div className="posts">
            <Title level={3} style={{ marginBottom: '3rem' }}>
                지금의 트렌드
            </Title>
            <div id="scrollArea">
                <Row gutter={[16, 32]}>{renderPosts(posts)}</Row>
                <button
                    className="up_to_top"
                    onClick={() => {
                        window.scrollTo(0, 0);
                    }}
                >
                    <UpCircleOutlined />
                </button>
            </div>
        </div>
    );
};
export default Sns_LandingPage;