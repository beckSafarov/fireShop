import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Nav, Form } from 'react-bootstrap';

const DropLink = ({ children, to, key }) => {
  return (
    <LinkContainer to={to}>
      <Nav.Link key={key}>{children}</Nav.Link>
    </LinkContainer>
  );
};

DropLink.defaultProps = {
  children: 'Sample Link',
  to: '/',
  key: 1,
};

export default DropLink;
