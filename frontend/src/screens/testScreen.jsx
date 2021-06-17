import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Auth from '../components/Auth';
import { useLocation } from 'react-router-dom';
import secret from '../secrets.json';
import { Button } from 'react-bootstrap';
import * as lcs from '../helpers/LCS';

const TestScreen = ({ location, history, match }) => {
  const people = ['Beck', 'Tom'];

  const [status, setStatus] = useState(false);

  useEffect(() => {}, []);

  const statusChanger = () => {
    console.log(`Before ${status}`);
    setStatus(!status);
    console.log(`After: ${status}`);
  };

  return (
    <>
      <h1>Welcome to test page</h1>
      <p>playground for testing stuff</p>
      <Button className='btn' onClick={statusChanger} type='button'>
        Status Change
      </Button>
      <p>{status ? 'Yes' : 'No'}</p>
    </>
  );
};

export default TestScreen;
