import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// internal components
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';

// redux actions
import { login } from '../../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const redirect =
    new URLSearchParams(useLocation().search).get('redirect') || '/';
  const originUrl = new URLSearchParams(useLocation().search).get('from');
  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      history.push(originUrl ? `${redirect}?redirect=${originUrl}` : redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
        <Button type='submit' className='btn-block' variant='info' rounded>
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
