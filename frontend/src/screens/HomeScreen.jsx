// -- LIBRARIES & METHODS
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// -- UI COMPONENTS
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';

// -- REDUX RELATED IMPORTS
import { listProducts } from '../actions/productActions.js';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    if (products.length === 0) dispatch(listProducts());
    return () => axios.CancelToken.source().cancel();
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <>
          <br />
          <Loader />
        </>
      ) : error ? (
        <>
          <br />
          <Message variant='danger' children={error} />
        </>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
