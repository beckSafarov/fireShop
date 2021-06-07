import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ROOT } from '../config';
import Loader from './Loader';

const Auth = ({ children, location }) => {
  const [logged, setLogged] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo;
  const userLogged = userInfo ? true : false;
  const userNotLogged =
    userLogin.loading === false && userInfo === undefined ? true : false;

  useEffect(() => {
    if (userNotLogged) location.pathname = `${ROOT}/signin`;

    if (userLogged) setLogged(true);
  }, [userNotLogged, userLogged]);

  return (
    <>
      {logged === null ? (
        <Loader />
      ) : logged ? (
        <>{children}</>
      ) : (
        <p>You should never see this</p>
      )}
    </>
  );
};

export default Auth;
