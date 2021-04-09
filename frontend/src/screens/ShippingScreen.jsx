import { useState } from 'react';
import { Form, CloseButtonProps, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckOutSteps from '../components/CheckOutSteps';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history, location, match }) => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  console.log(redirect);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };
  return (
    <FormContainer>
      <CheckOutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler} className='py-3'>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            className='form-field'
            onChange={(e) => setAddress(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            className='form-field'
            onChange={(e) => setCity(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postal code'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='number'
            className='form-field'
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            className='form-field'
            onChange={(e) => setCountry(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <div className='py-4'>
          <Button className='rounded-btn' type='submit' variant='success' block>
            Continue
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
