import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const Auth = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo;
  const userLogged = userInfo ? true : false;
  const userNotLogged =
    userLogin.loading === false && userInfo === undefined ? true : false;

  const [logged, setLogged] = useState(null);

  useEffect(() => {
    if (userNotLogged) setLogged(false);

    if (userLogged) setLogged(true);
  }, [userNotLogged, userLogged]);

  return {
    loading: logged !== null ? false : true,
    logged,
    userInfo,
  };
};

export default Auth;
