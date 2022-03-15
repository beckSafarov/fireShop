import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckOutSteps = ({ step: stepNumber }) => {
  const steps = [
    { link: '/shipping', label: 'Shipping' },
    { link: '/payment', label: 'Payment' },
    { link: '/placeorder', label: 'Place Order' },
  ]
  return (
    <Nav className='justify-content-center mb-4'>
      {steps.map((step, i) => (
        <Nav.Item key={i}>
          <LinkContainer to={step.link}>
            <Nav.Link disabled={i + 1 > stepNumber}>{step.label}</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      ))}
    </Nav>
  )
}

CheckOutSteps.defaultProps = {
  step: 1,
}

export default CheckOutSteps
