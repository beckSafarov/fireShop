import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap';
import CountOptions from './CountOptions';
import { Link } from 'react-router-dom';
import { qtyReset } from '../actions/cartActions';

const CartItem = ({ item, prices, index, dispatch, removeFromCart }) => {
  return (
    <ListGroup.Item key={item._id}>
      <p> {item.name}</p>
      <Row>
        <Col md={2}>
          <Image src={item.image} alt={item.name} fluid rounded />
        </Col>
        <Col md={3}>
          <Link to={`/product/${item._id}`}>{item.name}</Link>
        </Col>
        <Col md={2}>${prices[index]}</Col>
        <Col md={2}>
          <Form.Control
            as='select'
            value={item.qty}
            onChange={(e) =>
              dispatch(qtyReset(item._id, Number(e.target.value)))
            }
          >
            <CountOptions countInStock={item.countInStock} />
          </Form.Control>
        </Col>
        <Col md={2}>
          <Button
            type='button'
            variant='light'
            onClick={() => removeFromCart(item._id, item.name)}
          >
            <i className='fas fa-trash'></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CartItem;