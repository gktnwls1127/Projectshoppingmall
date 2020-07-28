import React from 'react'
import { Button, Descriptions } from 'antd'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../../../../_actions/user_action'
 
function ProductInfo(props) {

    const dispatch = useDispatch()

    const clickHandler = () => {

        //필요한 정보를 Cart 필드에 넣어준다.
        dispatch(addToCart(props.detail._id))
    
    }

    return (
        <div>
            <Descriptions title="상세정보" bordered>
                <Descriptions.Item label="가격">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="판매수량">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="조회수">{props.detail.views}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    장바구니담기
                </Button>
            </div>
            <br />
        </div>
    )
}

export default ProductInfo
