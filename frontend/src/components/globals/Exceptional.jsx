import React from 'react'
import Message from './Message'

const Exceptional = ({ variant, children }) => {
  return <Message variant={variant}>{children}</Message>
}

Exceptional.defaultProps = {
  variant: 'danger',
  children: 'System Error. Please contact support at support@fireshop.com',
}

export default Exceptional
