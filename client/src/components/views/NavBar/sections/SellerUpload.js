import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './SellerUpload.scss';
function SellerUpload() {
	return (
		<div className="boarder_button">
			<button>
				<Link to="/product/upload" style={{ color: 'inherit' }}>
					상품업로드
				</Link>
			</button>
		</div>
	);
}

export default withRouter(SellerUpload);