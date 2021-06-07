// -- LIBRARIES --
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Auth from '../../components/Auth';

// -- COMPONENTS --
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import { ReadOnlyForm, ProfileUpdateForm } from '../../components/Forms';

// -- REDUX RELATED IMPORTS --
import { updateUserProfile } from '../../actions/userActions';
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
  const [updated, setUpdated] = useState({
    name: null,
    email: null,
  });

  // -- redux stores --
  const dispatch = useDispatch();
  const updateRes = useSelector((state) => state.userDetailsUpdate);

  // variables
  const { userInfo } = useSelector((state) => state.userLogin);
  let loading = updateRes.loading;

  useEffect(() => {
    if (userInfo) resetValues();

    const unsubscribe = store.subscribe(() => {
      let update = store.getState().userDetailsUpdate;
      if (update.success) {
        setEditBtnClicked(false);
        setMessageHandler('success', 'Updated successfully');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (update.error) {
        setMessageHandler('danger', update.error, 3);
      }
    });

    return () => {
      axios.CancelToken.source().cancel();
      unsubscribe();
    };
  }, [updateRes.success, userInfo]);

  const setMessageHandler = (variant = 'danger', msg, seconds = 2) => {
    setMessage(msg);
    setmsgVariant(variant);
    setTimeout(function () {
      setMessage(null);
    }, seconds * 1000);
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

  const submitHandler = (e) => {
    e.preventDefault();
    //initiating update details
    if (fieldsValidated()) {
      dispatch(
        updateUserProfile({
          name: name !== '' ? name : undefined,
          email: email !== '' ? email : undefined,
          password: password !== '' ? password : undefined,
        })
      );
      setUpdated({
        name: name !== '' && name,
        email: email !== '' && email,
      });
    }
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
    <Auth history={history}>
      <Row>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Col md={2} sm={2}>
              <AccountSideMenu active={1} />
            </Col>
            <Col md={10} sm={10}>
              {userInfo && (
                <>
                  <h3>User Profile</h3>
                  {message && <Message variant={msgVariant}>{message}</Message>}
                  {!editBtnClicked ? (
                    <ReadOnlyForm
                      name={updated.name || name}
                      email={updated.email || email}
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
    </Auth>
  );
};

export default ProfileScreen;
