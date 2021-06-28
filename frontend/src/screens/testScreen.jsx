import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Nav, Form } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Auth from '../components/Auth';
import secret from '../secrets.json';
import { Button } from 'react-bootstrap';
import * as lcs from '../helpers/cartLCS';
import { LinkContainer } from 'react-router-bootstrap';
import { DropMenu, DropLink } from '../components/Dropdown';

const TestScreen = ({ location, history, match }) => {
  const people = ['Beck', 'Tom'];
  const [status, setStatus] = useState(10);
  const [positive, setPositive] = useState(false);

  useEffect(() => {
    // window.addEventListener('click', dropMenuHandler);
    // return () => window.removeEventListener('click', dropMenuHandler);
  }, []);

  const changeStatus = (value) => setStatus(value * 3);

  const clickMe = () => {
    // console.log('click me');
    setPositive(!positive);
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
    </>
  );
};

export default TestScreen;
