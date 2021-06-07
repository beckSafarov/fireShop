import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Auth from '../components/Auth';

const TestScreen = ({ location, history }) => {
  useEffect(() => {
    location.pathname = '/signin';
  }, []);

  // console.log(location);

  return (
    // <Auth location={location}>
    //   <h1>Welcome to auth component</h1>
    //   <p>Message from testscreen</p>
    // </Auth>
    <>
      <p>Welcome to test</p>
    </>
  );
};

export default TestScreen;
