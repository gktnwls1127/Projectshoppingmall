import React, { useState } from 'react';

import Slick from 'react-slick';
import RenderModal from './RenderModal';

function Sns_RenderImages(props) {
	const [visible, setVisible] = useState(false);

	const renderImages = (snapshots) =>
		snapshots.map((snapshot, index) => (
			<div key={index}>
				<img
					onClick={() => setVisible(true)}
					width="250px"
					background-color="inherit"
					height="250px"
					alt="포스트"
					src={`http://localhost:5000/${snapshot}`}
				/>
			</div>
		));

	return (
		<>
			<div>
				<Slick
					dots={true}
					infinite={true}
					speed={500}
					slidesToScroll={1}
					slidesToShow={1}
				>
					{renderImages(props.snapshots)}
				</Slick>
			</div>
			<div>
				<RenderModal
					visible={visible}
					setVisible={setVisible}
					snapshots={props.snapshots}
					renderImages={renderImages}
				/>
			</div>
		</>
	);
}

export default Sns_RenderImages;
