import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import NavBar from './views/NavBar/NavBar';

import Auth from '../hoc/auth';

function App() {
	return (
		<div>
			<Router>
				<NavBar />
				<Switch>
					<Route exact path="/" component={Auth(LandingPage, null)} />
					<Route exact path="/login" component={Auth(LoginPage, false)} />
					<Route exact path="/register" component={Auth(RegisterPage, false)} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
