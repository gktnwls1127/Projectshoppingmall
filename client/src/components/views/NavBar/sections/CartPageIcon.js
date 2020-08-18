import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons'
import {Badge} from 'antd'
import { useSelector } from "react-redux";

function CartPageIcon() {
    const user = useSelector((state) => state.user)

    return (

        <div className="cartNav_container">
            <button>
            <Badge count={user.userData && user.userData.cart.length}> 
				<Link to="/user/cart/cartpage" style={{  color:'#667777'}}>
                    <ShoppingCartOutlined style={{ fontSize: 30, }} />
				</Link>
	
            </Badge> 
			</button>
        </div>
    )
}

export default withRouter(CartPageIcon)
