// -- LIBRARIES --
import { useState, useEffect } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// -- COMPONENTS --
import Message from '../components/Message';
import Loader from '../components/Loader';
import { ReadOnlyForm, ProfileUpdateForm } from '../components/Forms';

// -- REDUX RELATED IMPORTS --
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { getMyOrders } from '../actions/orderActions';
import store from '../store';
import * as constants from '../constants';

const ProfileScreen = ({ location, history }) => {
  // hooks
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState(null);
  const [msgVariant, setmsgVariant] = useState('danger');
  const [editBtnClicked, setEditBtnClicked] = useState(false);

  // -- redux stores --
  const dispatch = useDispatch();

  // get user info
  const { loading, userDetails, error } = useSelector(
    (state) => state.userDetails
  );

  //get user update state
  const updateRes = useSelector((state) => state.userDetailsUpdate);

  //get list of current user's orders: loading, success, orders, error
  const myOrders = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (!userDetails) {
      dispatch(getUserDetails());
      dispatch(getMyOrders());
    } else if (error === 'Not authorized to access this route') {
      history.push('/');
    } else {
      setName(userDetails.name);
      setEmail(userDetails.email);
    }
  }, [history, userDetails, dispatch]);

  //function to make alerts disappear after some time
  const setMessageHandler = (variant, msg) => {
    setMessage(msg);
    setmsgVariant(variant);
    setTimeout(function () {
      setMessage(null);
    }, 3000);
  };

  // function to validate entered fields
  const fieldsValidated = () => {
    if (password !== '') {
      if (confirmPass !== password) {
        setMessageHandler('danger', 'Passwords do not match');
        return false;
      } else if (password.length < 6) {
        setMessageHandler(
          'danger',
          'Password should not be less than 6 characters long'
        );
        return false;
      }
    } else if (confirmPass !== '') {
      setMessageHandler('danger', 'New password was not written');
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    //validating fields
    fieldsValidated();

    //initiating dispatch
    if (fieldsValidated()) {
      await dispatch(
        updateUserProfile({
          name: name !== '' ? name : undefined,
          email: email !== '' ? email : undefined,
          password: password !== '' ? password : undefined,
        })
      );

      if (store.getState().userDetailsUpdate.success) {
        setMessageHandler('success', 'Updated successfully');
        setEditBtnClicked(false);
        localStorage.setItem('userInfo', JSON.stringify({ name, email }));
        dispatch({
          type: constants.USER_INFO_UPDATE,
          payload: { name, email },
        });
      } else {
        setMessageHandler('danger', store.getState().userDetailsUpdate.error);
      }
    }
  };

  const cancelChanges = (e) => {
    e.preventDefault();
    setName(userDetails.name);
    setEmail(userDetails.email);
    setPassword('');
    setConfirmPass('');
    setEditBtnClicked(false);
  };

  const editBtnHandler = (e) => {
    e.preventDefault();
    setEditBtnClicked(true);
  };

  //preparing props to pass to profile update form
  const values = { name, email };
  const functions = {
    submitHandler,
    setName,
    setEmail,
    setPassword,
    setConfirmPass,
    cancelChanges,
  };

  return (
    <Row>
      {loading || updateRes.loading ? (
        <Loader />
      ) : (
        <>
          <Col md={4}>
            {userDetails && (
              <>
                <h3>User Profile</h3>
                {(error || message) && (
                  <Message variant={msgVariant}>{error || message}</Message>
                )}
                {!editBtnClicked ? (
                  <ReadOnlyForm
                    name={name}
                    email={email}
                    onClick={editBtnHandler}
                  />
                ) : (
                  <ProfileUpdateForm values={values} functions={functions} />
                )}
              </>
            )}
          </Col>

          <Col md={8}>
            <h3>Orders</h3>
            {myOrders.loading ? (
              <Loader />
            ) : myOrders.error ? (
              <Message variant='danger'>myOrders.error</Message>
            ) : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>DATE</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                  </tr>
                </thead>
                <tbody>
                  {myOrders.orders.map((order, index) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>
                        {order.paidAt
                          ? order.paidAt.substring(0, 10)
                          : 'undefined'}
                      </td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isDelievered ? (
                          order.deliveredAt ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            'undefined'
                          )
                        ) : (
                          <div className='text-center'>
                            <i
                              className='fas fa-times'
                              style={{ color: 'red' }}
                            ></i>
                          </div>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className='btn-sm' variant='light'>
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </>
      )}
    </Row>
  );
};

export default ProfileScreen;
