import React, {useEffect, useState} from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../../../_actions/user_action'
import UserCardBlock from './Sections/UserCardBlock';
import { Empty, Result } from 'antd';
import Paypal from '../utils/Paypal'
import { withRouter } from 'react-router-dom'

function CartPage(props) {
    const userData = useSelector((state) => state.user.userData);
    const user = useSelector((state) => state.user)

    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)
    
    useEffect(() => {
          
        let cartItems = []

        //리덕스 User state안에 cart안에 상품이 들어있는지 확인
        if(userData && userData.cart) {
            if(userData.cart.length > 0) {
                userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })

                dispatch(getCartItems(cartItems, userData.cart))
                .then((response) => {
                    if (response.payload.length > 0) {
                        calculateTotal(response.payload)
                    }
                })
                
            }
            
        }
    }, [])

    const calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        });

        setTotal(total)
        setShowTotal(true)

    } 

    const removeFromCart = (productId) => {

        dispatch(removeCartItem(productId))
            .then(response => {
                if(response.payload.productInfo.length <= 0){
                    setShowTotal(false)
                } else {
                    calculateTotal(response.payload.productInfo)
                }
            })
    }

    const transactionSuccess = (data) => {

        dispatch(onSuccessBuy({
            paymentData : data,
            cartDetail : user.cartDetail
        }))
        .then(response => {
            if(response.payload.success) {
                setShowTotal(false)
                setShowSuccess(true)
            }
        })
    }

    return (
        <div style={{ width : '85%', margin: '3rem auto'}}>
            <h1>장바구니</h1>

            <div>
                <UserCardBlock 
                    products={user.cartDetail}
                    removeItem={removeFromCart}            
                />
            </div>

            {ShowTotal ? 
                <div style={{marginTop : '3rem'}}>
                    <h2>총 결제금액 {Total}원</h2>
                </div>
                : ShowSuccess ? 
                    <Result
                        status="success"
                        title="Successfully Purchased Item"
                    />
                    :

                    <div style={{
                        width: '100%', display: 'flex', flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <br />
                        <Empty description={false} />
                        <p>장바구니에 담긴 상품이 없습니다</p>
                    </div>
            }

            { ShowTotal &&
                <Paypal 
                    total = {Total}
                    onSuccess ={transactionSuccess}
                />
            }


        </div>
    )
}

export default withRouter(CartPage)
