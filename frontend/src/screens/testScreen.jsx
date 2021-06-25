import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Form } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Auth from '../components/Auth';
import { useLocation } from 'react-router-dom';
import secret from '../secrets.json';
import { Button } from 'react-bootstrap';
import * as lcs from '../helpers/cartLCS';

const TestScreen = ({ location, history, match }) => {
  const people = ['Beck', 'Tom'];
  const [status, setStatus] = useState(10);

  useEffect(() => {}, []);

  const changeStatus = (value) => setStatus(value * 3);

  const clickMe = () => {
    history.push('/shipping');
  };

  return (
    <>
      <h1>Welcome to test page</h1>
      <p>playground for testing stuff</p>
      <Col>
        <Row>
          <Form.Control
            as='select'
            defaultValue={status}
            onChange={(e) => changeStatus(e.target.value)}
          >
            <option key={1} value={1}>
              {1}
            </option>
            <option key={2} value={2}>
              {2}{' '}
            </option>
            <option key={3} value={3}>
              {3}
            </option>
          </Form.Control>
        </Row>
      </Col>
      <Col>
        <Row>
          <h2>Status: {status}</h2>
        </Row>
      </Col>
      <div className='py-4'>
        <Button onClick={clickMe} block>
          Click me
        </Button>
      </div>
    </>
  );
};

export default TestScreen;
