import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const Auth = () => {
  const {
    loading,
    userInfo: userLogged,
    error,
  } = useSelector((state) => state.userLogin);
  const userNotLogged = loading === false && userLogged === null;

  const [logged, setLogged] = useState(null);

  useEffect(() => {
    setLogged(userNotLogged ? false : userLogged ? true : null);
  }, [loading, userLogged]);

  return {
    loading,
    error: error || undefined,
    logged,
    userInfo: userLogged,
  };
};

export default Auth;
