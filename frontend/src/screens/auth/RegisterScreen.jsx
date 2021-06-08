// libraries & methods
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../../components/Auth';

// UI components
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { Form, Button, Row, Col } from 'react-bootstrap';

// redux actions
import { register } from '../../actions/userActions';
import FieldsValidated from '../../helpers/FieldsValidated';

const RegisterScreen = ({ location, history }) => {
  // hooks
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState(null);
  // redux related stuff
  const dispatch = useDispatch();
  const { loading: regLoading, error: regError } = useSelector(
    (state) => state.userRegister
  );

  // variables
  let error = regError || passError;
  let loading = regLoading;

  const submitHandler = (e) => {
    e.preventDefault();
    const validated = FieldsValidated(name, email, password, confirmPass);

    validated.success
      ? dispatch(register(name, email, password))
      : setPassError(validated.message);
  };

  return (
    <Auth history={history} reverse>
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
          <Button type='submit' className='btn-block' variant='info'>
            Register
          </Button>
        </Form>
        <Row className='py-3'>
          <Col className='text-center'>
            Already have account?{' '}
            <Link to='/signin'>
              <span className='link'>Login</span>
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </Auth>
  );
};

export default RegisterScreen;
