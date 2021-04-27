// -- LIBRARIES --
import { useState, useEffect } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// -- COMPONENTS --
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { ReadOnlyForm, ProfileUpdateForm } from '../../components/Forms';

// -- REDUX RELATED IMPORTS --
import { updateUserProfile } from '../../actions/userActions';
import { USER_INFO_UPDATE, USER_LOGIN_SUCCESS } from '../../constants';

const ProfileScreen = ({ location, history }) => {
  // hooks
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState(null);
  const [msgVariant, setmsgVariant] = useState('danger');
  const [editBtnClicked, setEditBtnClicked] = useState(false);

  // -- redux stores --
  const dispatch = useDispatch();

  // get user info
  const userLogin = useSelector((state) => state.userLogin);
  const userLogged = userLogin.userInfo ? true : false;
  const userNotLogged =
    userLogin.loading === false && userLogin.userInfo === undefined
      ? true
      : false;

  //get user update state
  const updateRes = useSelector((state) => state.userDetailsUpdate);

  useEffect(() => {
    if (userLogged) {
      setName(userLogin.userInfo.name);
      setEmail(userLogin.userInfo.email);
    }

    if (userNotLogged) history.push('/');

    if (updateRes.success) {
      setMessageHandler(
        'success',
        'Updated successfully. Refresh to see the changes'
      );
      setEditBtnClicked(false);
      setName(name !== '' ? name : userLogin.userInfo.name);
      setEmail(email !== '' ? email : userLogin.userInfo.email);
      dispatch({
        type: USER_INFO_UPDATE,
        payload: {
          isAdmin: userLogin.userInfo.isAdmin,
          _id: userLogin.userInfo._id,
          name: name !== '' ? name : userLogin.userInfo.name,
          email: email !== '' ? email : userLogin.userInfo.email,
        },
      });
    } else if (updateRes.error) {
      setMessageHandler('danger', updateRes.error);
    }
  }, [history, userLogged, userLogin, updateRes, dispatch]);

  //function to make alerts disappear after some time
  const setMessageHandler = (variant, msg) => {
    setMessage(msg);
    setmsgVariant(variant);
    setTimeout(function () {
      setMessage(null);
    }, 3000);
  };

  // function to validate entered fields
  const fieldsValidated = () => {
    if (password !== '') {
      if (confirmPass !== password) {
        setMessageHandler('danger', 'Passwords do not match');
        return false;
      } else if (password.length < 6) {
        setMessageHandler(
          'danger',
          'Password should not be less than 6 characters long'
        );
        return false;
      }
    } else if (confirmPass !== '') {
      setMessageHandler('danger', 'New password was not written');
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    //initiating update details
    if (fieldsValidated()) {
      await dispatch(
        updateUserProfile({
          name: name !== '' ? name : undefined,
          email: email !== '' ? email : undefined,
          password: password !== '' ? password : undefined,
        })
      );
    }
  };

  const cancelChanges = (e) => {
    e.preventDefault();
    setName(userLogin.userInfo.name);
    setEmail(userLogin.userInfo.email);
    setPassword('');
    setConfirmPass('');
    setEditBtnClicked(false);
  };

  const editBtnHandler = (e) => {
    e.preventDefault();
    setEditBtnClicked(true);
  };

  //preparing props to pass to profile update form
  const values = { name, email };
  const functions = {
    submitHandler,
    setName,
    setEmail,
    setPassword,
    setConfirmPass,
    cancelChanges,
  };

  return (
    <Row>
      {userLogin.loading || updateRes.loading ? (
        <Loader />
      ) : (
        <>
          <Col md={4}>
            {userLogged && (
              <>
                <h3>User Profile</h3>
                {message !== null && (
                  <Message variant={msgVariant}>{message}</Message>
                )}
                {!editBtnClicked ? (
                  <ReadOnlyForm
                    name={name}
                    email={email}
                    onClick={editBtnHandler}
                  />
                ) : (
                  <ProfileUpdateForm values={values} functions={functions} />
                )}
              </>
            )}
          </Col>
        </>
      )}
    </Row>
  );
};

export default ProfileScreen;
