import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import KakaoLogin from 'react-kakao-login';
import key from './config';
function LoginPage(props) {
	const dispatch = useDispatch();
	const [Email, setEmail] = useState('');
	const [Password, setPassword] = useState('');
	const onEmailHandler = (event) => {
		setEmail(event.currentTarget.value);
	};
	const onPasswordHandler = (event) => {
		setPassword(event.currentTarget.value);
	};
	const onSubmitHandler = (event) => {
		event.preventDefault(); //page가 refresh 되는 것을 막아줌
		let body = {
			email: Email,
			password: Password,
		};
		dispatch(loginUser(body)).then((response) => {
			if (response.payload.loginSuccess) {
				props.history.push('/');
			} else {
				alert('Error');
			}
		});
	};
	const loginHandler = (res) => {
		dispatch(loginUser(res)).then((response) => {
			if (response.payload.loginSuccess) {
				props.history.push('/');
			} else {
				alert('Error');
			}
		});
	};
	const errorHandler = (err) => {
		console.log(err);
		alert(err);
	};
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'flex-start',
				width: '100%',
				height: '100vh',
			}}
		>
			<form
				style={{ display: 'flex', flexDirection: 'column', marginTop: '5em' }}
				onSubmit={onSubmitHandler}
			>
				<label>Email</label>
				<input type="email" value={Email} onChange={onEmailHandler} />
				<label>Password</label>
				<input type="password" value={Password} onChange={onPasswordHandler} />
				<br />
				<button type="submit">Login</button>
				<div style={{ marginTop: '1em' }}>
					<KakaoLogin
						jsKey={key}
						onSuccess={loginHandler}
						onFailure={errorHandler}
						getProfile="true"
						buttonText="카카오톡 로그인"
					/>
				</div>
			</form>
		</div>
	);
}

export default withRouter(LoginPage);
