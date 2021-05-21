import { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import CheckOutSteps from '../../components/CheckOutSteps';
import { savePaymentMethod } from '../../actions/cartActions';

const PaymentScreen = ({ history, location, match }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo;
  const userLogged = userInfo ? true : false;
  const userNotLogged =
    userLogin.loading === false && userInfo === undefined ? true : false;

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  useEffect(() => {
    if (userLogged && !userInfo.shippingAddress) {
      history.push('/shipping');
    }
  }, [userLogin, history]);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler} className='py-3'>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal/Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='Paypal'
              checked
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            ></Form.Check>
          </Col>
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

export default PaymentScreen;