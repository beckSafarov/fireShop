import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState(null);
  const [msgVariant, setmsgVariant] = useState('danger');
  const dispatch = useDispatch();

  //get logged in user info
  const { userInfo } = useSelector((state) => state.userLogin);

  //get full user profile
  const { loading, userDetails, error } = useSelector(
    (state) => state.userDetails
  );

  //get user update state
  const updateRes = useSelector((state) => state.userDetailsUpdate);

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    } else {
      if (!userDetails) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(userDetails.name);
        setEmail(userDetails.email);
      }
    }
  }, [history, userInfo, userDetails, dispatch]);

  //function to make alerts disappear after some time
  const setMessageHandler = (variant, msg) => {
    setMessage(msg);
    setmsgVariant(variant);
    setTimeout(function () {
      setMessage(null);
    }, 3000);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let fieldsAreOk = true;
    if (password !== '') {
      if (confirmPass !== password) {
        setMessageHandler('danger', 'Passwords do not match');
        fieldsAreOk = false;
      } else if (password.length < 6) {
        setMessageHandler(
          'danger',
          'Password should not be less than 6 characters long'
        );
        fieldsAreOk = false;
      }
    } else if (confirmPass !== '') {
      setMessageHandler('danger', 'New password was not written');
      fieldsAreOk = false;
    }

    if (fieldsAreOk) {
      dispatch(
        updateUserProfile({
          name: name !== '' ? name : undefined,
          email: email !== '' ? email : undefined,
          password: password !== '' ? password : undefined,
        })
      );
    }
  };

  //trigger success alert when updated
  if (updateRes.success) {
    setMessageHandler('success', 'Profile Updated');
  }

  return (
    <Row>
      {(loading || updateRes.loading) && <Loader />}
      <Col md={6}>
        {(error || message) && (
          <Message variant={msgVariant}>{error || message}</Message>
        )}
        {userDetails && (
          <>
            <h3>User Profile</h3>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='email'>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type='text'
                  value={name}
                  className='form-field'
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  value={email}
                  className='form-field'
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  value={password}
                  className='form-field'
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  value={confirmPass}
                  className='form-field'
                  onChange={(e) => setConfirmPass(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button
                type='submit'
                className='btn-block'
                variant='info'
                rounded='true'
              >
                Update
              </Button>
            </Form>
          </>
        )}
      </Col>
      <Col md={6}>
        <h2>Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
