import React from 'react';
import { Modal, Carousel } from 'antd';

function RenderModal(props) {
	const handleOk = () => {
		props.setVisible(false);
	};
	const handleCancel = () => {
		props.setVisible(false);
	};

	const renderImages = (snapshots) => (
		<div>
			<Carousel>
				{snapshots.map((snapshot, index) => (
					<img
						key={index}
						width="20%"
						height="20%"
						alt="포스트"
						src={`http://localhost:5000/${snapshot}`}
					/>
				))}
			</Carousel>
		</div>
	);
	return (
		<div>
			<Modal
				width="800"
				centered
				cancelText="닫기"
				okText="확인"
				visible={props.visible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				{renderImages(props.snapshots)}
			</Modal>
		</div>
	);
}

export default RenderModal;
