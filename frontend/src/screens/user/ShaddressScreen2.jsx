// -- LIBRARIES --
import { useState, useEffect } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// -- COMPONENTS --
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { ShaddressReadForm, ShaddressUpdateForm } from '../../components/Forms';
import { LinkContainer } from 'react-router-bootstrap';
import AccountSideMenu from '../../components/AccountSideMenu';

// -- REDUX RELATED IMPORTS --
import { createShaddress, getMe } from '../../actions/userActions';
import { USER_INFO_UPDATE } from '../../constants';

const ShaddressScreen2 = ({ history }) => {
  // Redux stores
  const dispatch = useDispatch();
  const shaddress = useSelector((state) => state.shaddress);
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo;
  const userLogged = userInfo ? true : false;
  const userNotLogged =
    userLogin.loading === false && userInfo === undefined ? true : false;

  useEffect(() => {
    if (userNotLogged) history.push('/');
  }, [userLogin]);

  return (
    <Row>
      {userInfo && (
        <>
          {shaddress.loading ? (
            <Loader />
          ) : shaddress.error ? (
            <Message variant='danger'>{shaddress.error}</Message>
          ) : (
            <>
              <Col md={2} sm={2}>
                <AccountSideMenu active={2} />
              </Col>
              <Col md={10} sm={10}>
                <h3 className='mb-4'>Shipping Address</h3>
              </Col>
            </>
          )}
        </>
      )}
    </Row>
  );
};

export default ShaddressScreen2;
