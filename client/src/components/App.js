import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import Mypage from './views/MyPage/Mypage';
import NavBar from './views/NavBar/NavBar';
import Sns_LandingPage from './views/SNS/Sns_LandingPage';
import Sns_posts from './views/SNS/Sns_posts';
import Auth from '../hoc/auth';
import S_NavBar from '../components/views/NavBar/S_NavBar';

function App() {
	return (
		<div>
			<Router>
				<NavBar />
				<S_NavBar/>
				<Switch>
					<Route exact path="/" component={Auth(LandingPage, null)} />
					<Route exact path="/login" component={Auth(LoginPage, false)} />
					<Route exact path="/register" component={Auth(RegisterPage, false)} />
					<Route exact path="/mypage" component={Auth(Mypage, true)} />
					<Route exact path="/sns" component={Auth(Sns_LandingPage, null)} />
					<Route exact path="/sns/posts" component={Auth(Sns_posts, true)} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
