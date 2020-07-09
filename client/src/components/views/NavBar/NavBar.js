import React from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
function NavBar(props) {
	const userData = useSelector((state) => state.user.userData);
	const loginHandler = () => (
		<div
			style={{
				float: 'right',
				height: '100%',
				display: 'flex',
				justifyContent: 'flex-end',
				alignItems: 'flex-start',
			}}
		>
			<button
				style={{
					backgroundColor: '#1b1d1f',
					color: '#FFFFFF',
					borderRadius: '30px',
					marginTop: '1em',
					marginRight: '1em',
					fontSize: '18px',
					padding: '3em auto',
					border: 'none',
				}}
			>
				<Link to="/login" style={{ color: 'inherit' }}>
					로그인
				</Link>
			</button>
			<button
				style={{
					backgroundColor: '#1b1d1f',
					color: '#FFFFFF',
					borderRadius: '30px',
					marginTop: '1em',
					marginRight: '1em',
					fontSize: '18px',
					padding: '2em auto',
					border: 'none',
				}}
			>
				<Link to="/register" style={{ color: 'inherit' }}>
					회원가입
				</Link>
			</button>
		</div>
	);
	const onClickHandler = () => {
		axios.get('/api/users/logout').then((response) => {
			if (response.data.success) {
				props.history.push('/login');
			} else {
				console.log('로그아웃에 실패하였습니다');
			}
		});
	};
	const logoutHandler = () => (
		<div
			style={{
				float: 'right',
				height: '100%',
				display: 'flex',
				justifyContent: 'flex-end',
				alignItems: 'flex-start',
			}}
		>
			<button
				onClick={onClickHandler}
				style={{
					backgroundColor: '#1b1d1f',
					color: '#FFFFFF',
					borderRadius: '30px',
					marginTop: '1em',
					marginRight: '1em',
					fontSize: '18px',
					padding: '2em auto',
					border: 'none',
				}}
			>
				로그아웃
			</button>
		</div>
	);

	const boardHandler = () => {
		if (props.history.location.pathname.substring(0, 4) === '/sns') {
			return (
				<div
					style={{
						float: 'right',
						height: '100%',
						display: 'flex',
						alignItems: 'flex-start',
					}}
				>
					<button
						style={{
							backgroundColor: '#1b1d1f',
							color: '#FFFFFF',
							borderRadius: '30px',
							marginTop: '1em',
							marginRight: '1em',
							fontSize: '18px',
							padding: '2em auto',
							border: 'none',
						}}
					>
						<Link to="/sns/posts" style={{ color: 'inherit' }}>
							포스팅
						</Link>
					</button>
				</div>
			);
		} else {
			return;
		}
	};

	return (
		<div style={{ height: '15vh', background: '#FFFFFF' }}>
			<div className="container" style={{ width: '30%', display: 'inline' }}>
				<h1
					style={{
						color: '#1b1d1f',
						display: 'inline',
						marginLeft: '1em',
						fontWeight: 'bold',
					}}
				>
					<Link to="/sns" style={{ color: 'inherit' }}>
						#OOTD
					</Link>
				</h1>
				<h1
					style={{
						color: '#1b1d1f',
						display: 'inline',
						marginLeft: '1em',
						fontWeight: 'bold',
					}}
				>
					<Link to="/shoppingmall" style={{ color: 'inherit' }}>
						#쇼핑몰
					</Link>
				</h1>
			</div>

			{userData && !userData.isAuth && loginHandler()}
			{userData && userData.isAuth && logoutHandler()}
			{userData && userData.isAuth && boardHandler()}
		</div>
	);
}

export default withRouter(NavBar);
