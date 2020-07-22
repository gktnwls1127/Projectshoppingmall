import React from 'react';
import './RenderText.scss';
function RenderText(props) {
	// 더보기 버튼 클릭시 모달창 띄우기
	const openModal = () => {
		document.getElementById(props.post._id).click();
	};
	const renderText = () => {
		if (props.post.text.length > 16) {
			let slicedText = props.post.text.substr(0, 16);
			return (
				<p>
					{slicedText}
					<button onClick={openModal}>&nbsp;&nbsp;...더 보기</button>
				</p>
			);
		} else {
			return <p>{props.post.text}</p>;
		}
	};
	return (
		<div className="text_container">
			<div className="text_user_name">
				<h4>{props.post.writer.name}</h4>
			</div>
			<div className="text_main">{renderText()}</div>
			<div className="text_views">{props.post.views} views</div>
		</div>
	);
}

export default RenderText;
