import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';
export function loginUser(dataToSubmit) {
	const request = axios.post('/api/users/login', dataToSubmit).then(
		(response) => response.data
		//data를 주고 받는 것에 대한 상태관리를 해주는 것을 목적으로 redux 사용
		// request 안에 axios의 응답 결과물인 response.data가 들어감.
		//return을 시킨 후 reducer로 보냄
	);
	return {
		type: LOGIN_USER,
		payload: request,
	};
}

export function registerUser(dataToSubmit) {
	const request = axios
		.post('/api/users/register', dataToSubmit)
		.then((response) => response.data);
	return {
		type: REGISTER_USER,
		payload: request,
	};
}

export function auth() {
	const request = axios
		.get('/api/users/auth')
		.then((response) => response.data);
	return {
		type: AUTH_USER,
		payload: request,
	};
}
