// -- LIBRARIES & METHODS
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

// -- UI COMPONENTS
import { Loader, Product, FlashMsg } from '../components'
import { Row, Col } from 'react-bootstrap'

// -- REDUX RELATED IMPORTS
import { listProducts } from '../actions/productActions.js'

const HomeScreen = ({}) => {
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector((state) => state.productList)

  useEffect(() => {
    if (products.length < 1) dispatch(listProducts())

    return () => axios.CancelToken.source().cancel()
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      <Loader hidden={!loading} />
      <FlashMsg variant='danger' permanent>
        {error}
      </FlashMsg>
      {products && (
        <Row>
          {products.map((product) => (
            <Col
              className='align-items-stretch d-flex'
              key={product._id}
              sm={12}
              md={6}
              lg={4}
              xl={3}
            >
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
