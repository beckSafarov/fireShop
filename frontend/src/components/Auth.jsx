import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const Auth = ({ children, history, reverse }) => {
  const [permit, setPermit] = useState(false);

  const { loading, userInfo: logged } = useSelector((state) => state.userLogin);
  const notLogged = loading === false && logged === undefined;
  const redirect = history.location.pathname.replace('/', '');
  const queryRedirect = history.location.search.split('=')[1];

  useEffect(() => {
    if (!reverse) {
      notLogged && history.push(`/signin?redirect=${redirect}`);
      logged && setPermit(true);
    } else {
      logged && history.push(queryRedirect ? `/${queryRedirect}` : `/`);
      notLogged && setPermit(true);
    }
  }, [notLogged, logged, reverse]);

  return <>{loading ? <Loader /> : permit ? <>{children}</> : <p></p>}</>;
};

Auth.defaultProps = {
  children: <h1>Auth page</h1>,
  history: {
    location: { pathname: '/' },
    push: (loc = '/') => (window.location.href = loc),
  },
  reverse: false,
};

export default Auth;
