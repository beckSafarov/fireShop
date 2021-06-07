import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Auth from '../../components/Auth';

const PaymentFailure = ({ history }) => {
  const error = new URLSearchParams(useLocation().search).get('error');

  return (
    <Auth history={history}>
      <Container>
        <h2>Payment Failed!</h2>
        <div className='mt-20'>
          <p>Sorry! Your payment failed with the following error: </p>
          <div className='error-message-field'>
            <p>{error}</p>
          </div>
          <p>
            Please contact us with the screenshot at{' '}
            <a href='mailto:support@proshop.com'>support@proshop.com</a>
          </p>
        </div>
      </Container>
    </Auth>
  );
};

export default PaymentFailure;
