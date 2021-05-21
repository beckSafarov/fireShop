import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Auth from '../helpers/auth';

const TestScreen = ({ history }) => {
  const [message, setMessage] = useState('Loading...');
  const auth = Auth(history);

  const throwMessage = (msg) => {
    setMessage(msg);
  };

  useEffect(() => {
    if (!auth.loading && auth.logged) {
      throwMessage('User is logged');
    } else if (!auth.loading && !auth.logged) {
      throwMessage('User is not logged');
    }
  }, [auth]);
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default TestScreen;
