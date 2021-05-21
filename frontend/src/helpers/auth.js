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
  }, [userLogin]);

  if (logged !== null) {
    return {
      loading: false,
      logged: logged,
      userInfo: userInfo,
    };
  } else {
    return {
      loading: true,
    };
  }
};

export default Auth;
