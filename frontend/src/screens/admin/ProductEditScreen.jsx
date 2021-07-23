// -- LIBRARIES --
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// -- COMPONENTS --
import { Auth, Message, Loader, Spinner } from '../../components';
import { ReadOnlyForm, ProfileUpdateForm } from '../../components/Forms';

// -- REDUX RELATED IMPORTS --
import { updateUserProfile as update } from '../../actions/userActions';
import AccountSideMenu from '../../components/AccountSideMenu';
import FieldsValidated from '../../helpers/FieldsValidated';
import {
  USER_DETAILS_PROPERTY_RESET as userInfoReset,
  USER_INFO_UPDATE,
} from '../../constants';

const ProfileScreen = ({ history }) => {
  // -- redux stores --
  const dispatch = useDispatch();
  const {
    loading,
    success: updated,
    error: updateError,
  } = useSelector((state) => state.userDetailsUpdate);

  // variables
  const { userInfo } = useSelector((state) => state.userLogin);
  let newFields;

  // hooks
  const [fields, setFields] = useState({
    ...userInfo,
    password: '',
    confirmPass: '',
  });
  const [editClicked, setEditClicked] = useState(false);
  const [flashMsg, setFlashMsg] = useState({});

  useEffect(() => {
    if (updated) {
      dispatch({
        type: USER_INFO_UPDATE,
        payload: fields,
      });
      setEditClicked(false);
      setMsgHandler('Updated successfully');
      rxReset('success');
    }

    if (updateError) {
      setMsgHandler(updateError, 'danger');
      rxReset('error');
    }

    return () => axios.CancelToken.source().cancel();
  }, [updated, updateError]);

  const setMsgHandler = (message, variant = 'success') => {
    setFlashMsg({ display: true, variant, message });
    setTimeout(() => setFlashMsg({}), 3000);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const vld = FieldsValidated(
      fields.name,
      fields.email,
      fields.password || null,
      fields.confirmPass || null
    );

    vld.success
      ? dispatch(
          update({
            ...fields,
            password: fields.password || undefined,
          })
        )
      : setMsgHandler(vld.message, 'danger');
  };

  const changesHandler = (e) => {
    e.persist();
    newFields = { ...fields };
    newFields[e.target.name] = e.target.value;
    setFields(newFields);
  };

  const cancelChanges = () => {
    setFields({ ...userInfo });
    setEditClicked(false);
  };

  const editBtnHandler = () => setEditClicked(true);

  const rxReset = (payload) => dispatch({ type: userInfoReset, payload });

  const functions = {
    submitHandler,
    changesHandler,
    cancelChanges,
  };

  return (
    <Auth history={history}>
      <Row>
        <>
          {loading && <Spinner />}
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
                {editClicked ? (
                  <ProfileUpdateForm values={fields} functions={functions} />
                ) : (
                  <ReadOnlyForm
                    name={fields.name}
                    email={fields.email}
                    onClick={editBtnHandler}
                  />
                )}
              </>
            )}
          </Col>
        </>
      </Row>
    </Auth>
  );
};

export default ProfileScreen;
