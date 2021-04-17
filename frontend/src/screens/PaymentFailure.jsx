import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Image, Container } from 'react-bootstrap';

const PaymentFailure = () => {
  const error = new URLSearchParams(useLocation().search).get('error');

  return (
    <Container>
      <h2 class='danger-text'>Payment Failed!</h2>
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
  );
};

export default PaymentFailure;
