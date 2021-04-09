import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions.js';
import store from '../store.js';

const HomeScreen = () => {
  const dispatch = useDispatch();

  //bring the list of products from the current redux state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList; // bring up all the possible states

  useEffect(() => {
    //dispatch server request for new products state
    dispatch(listProducts());
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
