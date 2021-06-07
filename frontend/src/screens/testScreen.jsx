import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Auth from '../components/Auth';

const TestScreen = ({ location, history, match }) => {
  useEffect(() => {
    // consoleLocs();

    console.log(location.search.split('=')[1]);
  }, []);

  const consoleLocs = () => {
    console.log('match below');
    console.log(match);
    console.log('loc below');
    console.log(location);
  };

  return (
    <>
      {/* <Auth history={history}>
        <h1>Welcome to auth component</h1>
        <p>Message from testscreen</p>
      </Auth> */}
      <h1>Welcome to testscreen</h1>
      <p>Message from testscreen</p>
    </>
  );
};

export default TestScreen;
