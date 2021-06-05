import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Auth from '../../helpers/auth.js';

// internal components
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';

// redux actions
import { login } from '../../actions/userActions';

const LoginScreen = ({ history }) => {
  // redux stuff
  const dispatch = useDispatch();
  const { loading: loginLoading, error } = useSelector(
    (state) => state.userLogin
  );

  // hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // variables
  const auth = Auth();
  const cancelTokenSource = axios.CancelToken.source();
  const redirect =
    new URLSearchParams(useLocation().search).get('redirect') || '/';
  const originUrl = new URLSearchParams(useLocation().search).get('from');
  let loading = loginLoading || auth.loading;

  useEffect(() => {
    if (auth.logged)
      history.push(originUrl ? `${redirect}?redirect=${originUrl}` : redirect);

    return () => cancelTokenSource.cancel();
  }, [history, auth.logged]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        {error && <Message variant='danger'>{error}</Message>}
        <Form.Group controlId='email'>
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
        </Form.Group>
        <Button type='submit' className='btn-block' variant='info'>
          Sign in
        </Button>
        <Row className='py-3'>
          <Col className='text-center'>
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              <span className='link'>Register</span>
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
