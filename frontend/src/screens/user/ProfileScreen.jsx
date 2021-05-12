// -- LIBRARIES --
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// -- COMPONENTS --
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import { ReadOnlyForm, ProfileUpdateForm } from '../../components/Forms';

// -- REDUX RELATED IMPORTS --
import { updateUserProfile } from '../../actions/userActions';
import { USER_INFO_UPDATE } from '../../constants';
import AccountSideMenu from '../../components/AccountSideMenu';
import store from '../../store';

const ProfileScreen = ({ history }) => {
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
  const { userInfo } = userLogin;
  const userLogged = userInfo ? true : false;
  const userNotLogged =
    userLogin.loading === false && userInfo === undefined ? true : false;

  //get user update state
  const updateRes = useSelector((state) => state.userDetailsUpdate);

  useEffect(() => {
    if (userLogged) {
      resetValues();
    } else if (userNotLogged) history.push('/');

    if (updateRes.success) resetValues(name, email);

    store.subscribe(() => {
      if (store.getState().userDetailsUpdate.success) {
        setMessageHandler(
          'success',
          'Updated successfully. Refresh to see the changes'
        );
      }
    });

    const cancelTokenSource = axios.CancelToken.source();
    return () => cancelTokenSource.cancel();
  }, [history, userLogin, updateRes]);

  //function to make alerts disappear after some time
  const setMessageHandler = (variant, msg) => {
    setMessage(msg);
    setmsgVariant(variant);
    setTimeout(function () {
      setMessage(null);
    }, 2000);
  };

  const resetValues = (
    passedName = userInfo.name,
    passedEmail = userInfo.email
  ) => {
    setName(passedName);
    setEmail(passedEmail);
    setPassword('');
    setConfirmPass('');
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
    setEditBtnClicked(false);
  };

  const cancelChanges = () => {
    resetValues();
    setEditBtnClicked(false);
  };

  const editBtnHandler = () => setEditBtnClicked(true);

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
          <Col md={2} sm={2}>
            <AccountSideMenu active={1} />
          </Col>
          <Col md={10} sm={10}>
            {userLogged && (
              <>
                <h3>User Profile</h3>
                {message && <Message variant={msgVariant}>{message}</Message>}
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
