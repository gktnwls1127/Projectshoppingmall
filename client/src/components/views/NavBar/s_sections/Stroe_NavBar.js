import React from 'react'
import './Store_NavBar.scss'
import { Link } from 'react-router-dom';
function Stroe_NavBar() {
    return(

        <div className="Store_navbar">
        <h1 >
            <Link to="/shoppingmall/home" style={{ color: 'inherit' }}>
                홈
					</Link>
        </h1>
        <h1>
            <Link to="/shoppingmall/close" style={{ color: 'inherit' }}>
                옷
					</Link>
        </h1>
        <h1>
            <Link to="/shoppingmall/life" style={{ color: 'inherit' }}>
                라이프
					</Link>
        </h1>
        <h1 >
            <Link to="/shoppingmall/shoes" style={{ color: 'inherit' }}>
                신발
					</Link>
        </h1>
    </div>

)

}

export default Stroe_NavBar
