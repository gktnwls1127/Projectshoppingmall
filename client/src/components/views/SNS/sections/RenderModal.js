import React, { useEffect } from 'react';
import Modal from 'react-modal';
import Slick from 'react-slick';

import './RenderModal.scss';

const customStyles = {
	overlay: {},
	content: {
		margin: 'auto',
		width: '955px',
		height: '851px',
		overflow: 'hidden',
		background: '#F7F8F9',
	},
};

function RenderModal(props) {
	useEffect(() => {
		Modal.setAppElement('#root');
	});
	const handleCancel = () => {
		props.setVisible(false);
	};

	return (
		<div>
			<Modal
				okText="확인"
				isOpen={props.visible}
				onRequestClose={handleCancel}
				style={customStyles}
			>
				<div className="modal_container">
					<div className="modal_image">
						<Slick
							dots={true}
							infinite={true}
							speed={500}
							slidesToScroll={1}
							slidesToShow={1}
						>
							{props.renderImages(props.snapshots)}
						</Slick>
					</div>
					<div className="modal_info"></div>
				</div>
			</Modal>
		</div>
	);
}

export default RenderModal;
