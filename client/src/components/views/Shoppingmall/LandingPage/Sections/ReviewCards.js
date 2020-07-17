import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ImageSlider from '../../utils/ImageSlider';
import { Icon, Col, Card, Row } from 'antd';
import './Cards.css'

const { Meta } = Card;

function ReviewCards() {
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(4)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })

    useEffect(() => {
        
        let body = {
            skip : Skip,
            limit : Limit
        }

        getProducts(body)

    }, [])

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
        }
        getProducts(variables)
        setSkip(skip)
    }


    const getProducts = (body) => {

        axios.post('/api/product/products', body)
            .then(response => {
                if(response.data.success) {
                    if(body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert("상품들을 가져오는데 실패했습니다.")
                }
            })

    }

    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={6} xs={6}>
            <Card 
                style ={{width:'320px', height: '435px'}}
                hoverable={true}
                cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        getProducts(variables)
        setSkip(0)

    }

    return (
        <div>
            <section className="hot_section" style={{backgroundColor : 'black'}}>
                <div className="hot_div_h2" style={{marginTop: '3rem'}}>
                    <h2 className="hot_h2" style={{color: 'white', fontWeight: 'bold'}}>인기 구매후기</h2>
                </div>
                <br/> <br/>
                <div style={{display : 'flex', justifyContent: 'center'}}>
                    <div width="0.5, 0.25">
                        <Row gutter={[16, 16]}>
                            {renderCards}
                        </Row>
                    </div>
                </div>
                <br /><br />
            </section>
        </div>
    )
}


export default ReviewCards
