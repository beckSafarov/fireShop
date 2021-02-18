import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';

const ProductScreen = ({ match }) => {
  const productList = useSelector((state) => state.productList);
  console.log(productList);
  const product = productList.products.filter(
    (product) => product.id === match.params.id
  );

  // useEffect(()=>{
  // //    const fetchProduct = async()=>{
  // //        const {data} = await axios.get(`/api/products/${match.params.id}`);
  // //        setProduct(data.data[0]);
  // //    }

  // //    fetchProduct();
  // }, []);

  return (
    <>
      <Link className='btn btn-light my-3 rounded' to='/'>
        <i className='fas fa-arrow-left fa-2x'></i>
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>Price:</strong> ${product.price}
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>Description</h5>
              {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>{product.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>
                  <strong>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className='btn-block'
                type='button'
                disabled={product.countInStock === 0}
              >
                Add To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
