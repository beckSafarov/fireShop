// libraries & methods
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// UI components
import { Table, Row, Col, Button, Image } from 'react-bootstrap';
import { Auth, Message, Loader, Exceptional } from '../../components';

// redux actions
import { listProducts } from '../../actions/productActions';
import { Link } from 'react-router-dom';

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const {
    loading: productsLoading,
    error: productsError,
    products,
  } = useSelector((state) => state.productList);

  const loading = productsLoading;
  const error = productsError;

  useEffect(() => {
    products.length === 0 && dispatch(listProducts());

    return () => axios.CancelToken.source().cancel();
  }, [dispatch]);

  const deleteHandler = (id, name = 'undefined') => {
    // const c = `Are you sure to delete ${name}?`;
    // if (window.confirm(c)) dispatch(deleteUser(id));
    console.log('you deleted the user!');
  };

  const editProductHandler = () => {
    console.log('you edited the product');
  };
  const createProductHandler = () => {
    console.log('you clicked the new product btn');
  };

  return (
    <Auth history={history} adminOnly>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : products ? (
        <>
          <Row className='align-items-center'>
            <Col>
              <h1>Product List</h1>
            </Col>
            <Col className='text-right'>
              <Button
                variant='info'
                className='my-3'
                onClick={createProductHandler}
              >
                <i className='fas fa-plus'></i> New Product
              </Button>
            </Col>
          </Row>

          <Table responsive className='tale-sm'>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <div className='product-table-img'>
                    <Link to={`/product/${product._id}`}>
                      <img src={product.image} alt={product.name} />
                    </Link>
                  </div>
                  <td>
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </td>
                  <td>$ {product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <div className='two-horizontal-icons'>
                      <div>
                        <i
                          onClick={editProductHandler}
                          className='fas fa-edit'
                        ></i>
                      </div>
                      <div>
                        <i
                          onClick={() =>
                            deleteHandler(product._id, product.name)
                          }
                          className='fas fa-trash'
                        ></i>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <Exceptional />
      )}
    </Auth>
  );
};

export default ProductListScreen;
