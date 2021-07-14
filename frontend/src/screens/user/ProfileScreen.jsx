// -- LIBRARIES --
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Auth from '../../components/Auth';

// -- COMPONENTS --
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { ReadOnlyForm, ProfileUpdateForm } from '../../components/Forms';

// -- REDUX RELATED IMPORTS --
import { updateUserProfile } from '../../actions/userActions';
import AccountSideMenu from '../../components/AccountSideMenu';
import FieldsValidated from '../../helpers/FieldsValidated';
import { USER_DETAILS_PROPERTY_RESET, USER_INFO_UPDATE } from '../../constants';

const ProfileScreen = ({ history }) => {
  // hooks
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [editBtnClicked, setEditBtnClicked] = useState(false);
  const [flashMsg, setFlashMsg] = useState({});

  // -- redux stores --
  const dispatch = useDispatch();
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useSelector((state) => state.userDetailsUpdate);

  // variables
  const { userInfo } = useSelector((state) => state.userLogin);
  const loading = updateLoading;

  useEffect(() => {
    userInfo && resetValues();

    if (updateSuccess) {
      dispatch({
        type: USER_INFO_UPDATE,
        payload: { name, email },
      });
      setEditBtnClicked(false);
      setMsgHandler('Updated successfully', 'success');
      rxReset('success');
      updateValues();
    }

    if (updateError) {
      setMsgHandler(updateError, 'danger');
      rxReset('success');
    }

    return () => axios.CancelToken.source().cancel();
  }, [updateSuccess, updateError, userInfo]);

  const setMsgHandler = (msg, variant) => {
    setFlashMsg({ display: true, variant, message: msg });
    setTimeout(() => {
      setFlashMsg({ display: false });
    }, 3000);
  };

  const resetValues = () => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPassword('');
    setConfirmPass('');
  };

  const updateValues = () => {
    setName(name);
    setEmail(email);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validation = password
      ? FieldsValidated(name, email)
      : FieldsValidated(name, email, password, confirmPass);

    validation.success
      ? dispatch(
          updateUserProfile({
            name: name || undefined,
            email: email || undefined,
            password: password || undefined,
          })
        )
      : setMsgHandler(validation.message, 'danger');
  };

  const cancelChanges = () => {
    resetValues();
    setEditBtnClicked(false);
  };

  const editBtnHandler = () => setEditBtnClicked(true);

  const rxReset = (payload) => {
    dispatch({
      type: USER_DETAILS_PROPERTY_RESET,
      payload,
    });
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
                  {flashMsg.display && (
                    <Message variant={flashMsg.variant}>
                      {flashMsg.message}
                    </Message>
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
    </Auth>
  );
};

export default ProfileScreen;
