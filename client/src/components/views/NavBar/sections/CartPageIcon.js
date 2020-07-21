import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons'

function CartPageIcon() {
    return (
        <div>
            <button>
				<Link to="/user/cart" style={{ marginRight: -22 , color:'#667777'}}>
                    <ShoppingCartOutlined style={{ fontSize: 20, marginBottom: 3 }} />
				</Link>
			</button>
        </div>
    )
}

export default withRouter(CartPageIcon)
