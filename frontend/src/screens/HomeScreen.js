import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {Row, Col, Container} from 'react-bootstrap'
import Hero from '../components/Hero'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import Meta from '../components/Meta'

const HomeScreen = () => {
  const dispatch = useDispatch()
  let { keyword } = useParams()
  let { pageNumber } = useParams()
  if(!pageNumber) pageNumber = 1

  const productList = useSelector( state => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])


  return (
    <>
        <Meta />
        {!keyword && (pageNumber === 1) && <Hero />}
        <Container>
        <h1>Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
          <Row>
            {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
        </>
        )}
        </Container>
    </>
  )
}

export default HomeScreen