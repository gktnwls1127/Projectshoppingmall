import React from 'react'
import './Store_NavBar.scss'
import { Link } from 'react-router-dom';
function Stroe_NavBar() {
    return(

        <div className="Store_navbar">
        <h3 >
            <Link to="/shoppingmall" style={{ color: 'inherit' }}>
                홈
			</Link>
        </h3>
        <h3 >
            <Link to="/shoppingmall/best_item" style={{ color: 'inherit' }}>
                랭킹
			</Link>
        </h3>
        <h3>
            <Link to="/shoppingmall/outer" style={{ color: 'inherit' }}>
                아우터
		    </Link>
        </h3>
        <h3>
            <Link to="/shoppingmall/shirt_blouse" style={{ color: 'inherit' }}>
                상의
		    </Link>
        </h3>
        <h3>
            <Link to="/shoppingmall/pants" style={{ color: 'inherit' }}>
                바지
			</Link>
        </h3>
        <h3>
            <Link to="/shoppingmall/onepiece" style={{ color: 'inherit' }}>
                원피스
			</Link>
        </h3>
        <h3>
            <Link to="/shoppingmall/skirt" style={{ color: 'inherit' }}>
                치마
			</Link>
        </h3>
        <h3 >
            <Link to="/shoppingmall/shoes" style={{ color: 'inherit' }}>
                신발
			</Link>
        </h3>
    </div>

)

}

export default Stroe_NavBar
