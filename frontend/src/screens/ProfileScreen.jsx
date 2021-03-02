import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { ReadOnlyForm, ProfileUpdateForm } from '../components/Forms';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import store from '../store';
import * as constants from '../constants';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState(null);
  const [msgVariant, setmsgVariant] = useState('danger');
  const [editBtnClicked, setEditBtnClicked] = useState(false);
  const dispatch = useDispatch();

  //get full user profile
  const { loading, userDetails, error } = useSelector(
    (state) => state.userDetails
  );

  if (error === 'Not authorized to access this route') {
    history.push('/');
  }

  //get user update state
  const updateRes = useSelector((state) => state.userDetailsUpdate);

  useEffect(() => {
    if (!userDetails) {
      dispatch(getUserDetails());
    } else {
      setName(userDetails.name);
      setEmail(userDetails.email);
    }
  }, [history, userDetails, dispatch]);

  //function to make alerts disappear after some time
  const setMessageHandler = (variant, msg) => {
    setMessage(msg);
    setmsgVariant(variant);
    setTimeout(function () {
      setMessage(null);
    }, 3000);
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

  const submitHandler = async (e) => {
    e.preventDefault();
    //validating fields
    fieldsValidated();

    //initiating dispatch
    if (fieldsValidated()) {
      await dispatch(
        updateUserProfile({
          name: name !== '' ? name : undefined,
          email: email !== '' ? email : undefined,
          password: password !== '' ? password : undefined,
        })
      );

      if (store.getState().userDetailsUpdate.success) {
        setMessageHandler('success', 'Updated successfully');
        setEditBtnClicked(false);
        localStorage.setItem('userInfo', JSON.stringify({ name, email }));
        dispatch({
          type: constants.USER_INFO_UPDATE,
          payload: { name, email },
        });
      } else {
        setMessageHandler('danger', store.getState().userDetailsUpdate.error);
      }
    }
  };

  const cancelChanges = (e) => {
    e.preventDefault();
    setName(userDetails.name);
    setEmail(userDetails.email);
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
      {loading || updateRes.loading ? (
        <Loader />
      ) : (
        <>
          <Col md={4}>
            {userDetails && (
              <>
                <h3>User Profile</h3>
                {(error || message) && (
                  <Message variant={msgVariant}>{error || message}</Message>
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

          <Col md={8}>
            <h3>Orders</h3>
          </Col>
        </>
      )}
    </Row>
  );
};

export default ProfileScreen;
