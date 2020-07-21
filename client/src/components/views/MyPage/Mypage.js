import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import './Mypage.scss';
function Mypage(props) {
	const user = useSelector((state) => state.user.userData);

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

	return (
		<div className="container">
			<div className="list_container">
				{/* 회원 정보 목록 */}

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
			</div>
			<div className="user_posts">{/* 본인 게시글 */}</div>
		</div>
	);
}

export default withRouter(Mypage);
