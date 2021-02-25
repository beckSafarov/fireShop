import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  //get user register states
  const { loading, success, error } = useSelector(
    (state) => state.userRegister
  );

  //get user login states
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type='text'
            value={name}
            className='form-field'
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            value={email}
            className='form-field'
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            className='form-field'
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            value={confirmPass}
            className='form-field'
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button
          type='submit'
          className='btn-block'
          variant='info'
          rounded='true'
        >
          Register
        </Button>
        <Row className='py-3'>
          <Col className='text-center'>
            Already have account?{' '}
            <Link to='/signin'>
              <span className='link'>Login</span>
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
