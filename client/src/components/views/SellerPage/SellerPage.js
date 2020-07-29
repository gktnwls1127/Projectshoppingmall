import React from 'react'
import { useSelector } from "react-redux";


function SellerPage() {
    const userData = useSelector((state) => state.user.userData);

    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'start' }}>
                <h1>게시한 상품</h1>
            </div>
            <br/>

            <table>
                <thead>
                    <tr>
                        <th>상품아이디</th>
                        <th>상품명</th>
                        <th>상품이미지</th>
                        <th>가격</th>
                        <th>카테고리</th>
                        <th>설명</th>
                    </tr>
                </thead>

                <tbody>
                    {userData && userData.product.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.image}</td>
                            <td>{item.price}</td>
                            <td>{item.continent}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


export default SellerPage
