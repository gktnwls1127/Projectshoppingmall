import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './LandingPageNav.scss';
function LandingPageNav() {
	return (
		<div className="landingPage_nav">
			<h1>
				<Link to="/sns" style={{ color: 'inherit' }}>
					#SNS
				</Link>
			</h1>
			<h1>
				<Link to="/shoppingmall" style={{ color: 'inherit' }}>
					#STORE
				</Link>
			</h1>
		</div>
	);
}

export default withRouter(LandingPageNav);
