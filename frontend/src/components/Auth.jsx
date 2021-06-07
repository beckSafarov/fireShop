import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const Auth = ({ children, history }) => {
  const [permit, setPermit] = useState(false);

  const { loading, userInfo: logged } = useSelector((state) => state.userLogin);
  const notLogged = loading === false && logged === undefined;
  const redirect = history.location.pathname.replace('/', '');

  useEffect(() => {
    if (notLogged) {
      history.push(`/signin?redirect=${redirect}`);
    } else if (logged) setPermit(true);
  }, [notLogged, logged]);

  return <>{loading ? <Loader /> : permit ? <>{children}</> : <p></p>}</>;
};

Auth.defaultProps = {
  children: <h1>Auth page</h1>,
  history: {
    location: { pathname: '/' },
    push: (loc = '/') => (window.location.href = loc),
  },
};

export default Auth;
