import React, { useState } from 'react';
import { Carousel } from 'antd';
import RenderModal from './sections/RenderModal';
function Sns_RenderImages(props) {
	const [visible, setVisible] = useState(false);

	const renderImages = (snapshots) =>
		snapshots.map((snapshot, index) => (
			<img
				onClick={() => setVisible(true)}
				key={index}
				width="250px"
				height="250px"
				alt="포스트"
				src={`http://localhost:5000/${snapshot}`}
			/>
		));

	return (
		<div>
			<Carousel>{renderImages(props.snapshots)}</Carousel>
			<RenderModal
				visible={visible}
				setVisible={setVisible}
				snapshots={props.snapshots}
			/>
		</div>
	);
}

export default Sns_RenderImages;
