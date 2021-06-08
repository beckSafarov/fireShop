import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const Auth = () => {
  const { loading, userInfo: userLogged } = useSelector(
    (state) => state.userLogin
  );
  const userNotLogged = loading === false && userLogged === undefined;

  const [logged, setLogged] = useState(null);

  useEffect(() => {
    setLogged(userNotLogged ? false : userLogged ? true : null);
  }, [loading, userLogged]);

  return {
    loading,
    logged,
    userInfo: userLogged,
  };
};

export default Auth;
