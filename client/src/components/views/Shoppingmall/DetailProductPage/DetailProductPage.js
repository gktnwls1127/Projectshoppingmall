import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
import { Row, Col } from 'antd'
import { withRouter } from 'react-router-dom';

function DetailProductPage(props) {

    const productId = props.match.params.productId

    const [Product, setProduct] = useState({})

    useEffect(()=>{
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })
            .catch(err => alert(err))
    },[])

    return (
        <div overflow="hidden" width="100%,80rem" className="jCusAo">

            <div className="frHBaV">
                <div style={{ display: "none,block" }} className="cka-dPy">
                    <h1 color="gray100" font-weight="bold" className="kompeH">{Product.title}</h1>
                </div>

                <br />
                <div display="flex" className="kxZXxz">
                    <div width="1,0.5833333333333334" className="feTtOu">
                        <div overflow="hidden" className="jbpLml">
                            <ProductImage detail={Product}/>
                        </div>
                    </div>
                    <div width="1,0.4166666666666667" className="jtLMFf">
                        <div className="iojNJW">
                            <div display="block,none" className="jabpb">
                            <p color="gray100" font-weight="normal" class="cxbvIt">{Product.title}</p>
                            </div>
                                <ProductInfo detail={Product}/>
                        </div> 
                    </div>
                    
                </div> 
            </div>

        </div>
    )
}

export default withRouter(DetailProductPage)