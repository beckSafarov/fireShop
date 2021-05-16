import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AccountSideMenu = ({ active }) => {
  return (
    <ListGroup variant='flush'>
      <LinkContainer to='/profile'>
        <ListGroup.Item active={active === 1} action={active !== 1}>
          Profile
        </ListGroup.Item>
      </LinkContainer>
      <LinkContainer to='/address'>
        <ListGroup.Item active={active === 2} action={active !== 2}>
          Address
        </ListGroup.Item>
      </LinkContainer>
      <LinkContainer to='/myreviews'>
        <ListGroup.Item active={active === 3} action={active !== 3}>
          My Reviews
        </ListGroup.Item>
      </LinkContainer>
    </ListGroup>
  );
};

export default AccountSideMenu;
