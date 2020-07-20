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
import Shop_Landingpage from './views/Shoppingmall/LandingPage/Shop_Landingpage'
import Shop_EventPages from './views/Shoppingmall/EventPage/EventPages';
import UploadProductPage from './views/Shoppingmall/UploadProductPage/UploadProductPage'
import DetailPage from './views/Shoppingmall/DetailProductPage/DetailProductPage'


function App() {
	return (
		<div>
			<Router>
				<NavBar />
				<S_NavBar/>
				<Switch>
					<Route exact path="/" component={Auth(Shop_Landingpage, null)} />
					<Route exact path="/login" component={Auth(LoginPage, false)} />
					<Route exact path="/register" component={Auth(RegisterPage, false)} />
					<Route exact path="/mypage" component={Auth(Mypage, true)} />
					<Route exact path="/sns" component={Auth(Sns_LandingPage, null)} />
					<Route exact path="/sns/posts" component={Auth(Sns_posts, true)} />
					<Route exact path="/shoppingmall" component={Auth(Shop_Landingpage, null)} />
					<Route exact path="/shoppingmall/eventpage" component={Auth(Shop_EventPages, null)} />
					<Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
					<Route exact path="/product/:productId" component={Auth(DetailPage, null)} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
