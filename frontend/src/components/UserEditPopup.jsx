// libraries & methods
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// UI components
import Modal from 'react-bootstrap/Modal';
import { Message, Spinner, ConfirmModal } from '.';
import { AdminUserUpdateForm } from './Forms';
import { ADMIN_USER_UPDATE_RESET } from '../constants';

// redux actions
import { adminUpdateUser } from '../actions/adminActions';
import FieldsValidated from '../helpers/FieldsValidated';
const defaultUserInfo = {
  name: '',
  email: '',
  admin: false,
  shippingAddress: {
    address: '',
    city: '',
    postalCode: '',
    country: '',
  },
};

const UserEditPopup = ({ modal, setModal }) => {
  const dispatch = useDispatch();
  const {
    loading,
    success: updated,
    error,
  } = useSelector((state) => state.adminUserUpdate);

  // hooks
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [user, setUser] = useState(defaultUserInfo);
  const [change, setChange] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    heading: 'Admin Privilege Changes',
  });
  const [flashMsg, setFlashMsg] = useState({});
  const fire = `Are you sure to revoke ${userInfo.name}'s admin rights?`;
  const promote = `Are you sure to give ${userInfo.name} admin privileges?`;
  let value, newUser;

  useEffect(() => {
    modal && modal.userInfo && resetValues();
    updated && hide();

    if (error) {
      msgHandler(error, 'danger');
      rxReset('error');
    }
  }, [modal, updated, error]);

  const madeChanges = () => {
    let ch = false;
    Object.keys(user).forEach((i) => {
      if (typeof user[i] === 'object') {
        Object.keys(user[i]).forEach((j) => {
          ch = user[i][j] !== userInfo[i][j] ? true : ch;
        });
      } else {
        ch = user[i] !== userInfo[i] ? true : ch;
      }
    });
    return ch;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (madeChanges()) {
      const vld = FieldsValidated(user.name, user.email);
      if (vld.success) {
        dispatch(adminUpdateUser(userInfo._id, user));
      } else {
        msgHandler(vld.message, 'danger');
        setChange(false);
      }
    } else {
      hide();
    }
  };

  const resetValues = (fromModal = true) => {
    const src = fromModal
      ? {
          ...modal.userInfo,
          shippingAddress: {
            ...modal.userInfo.shippingAddress,
          },
        }
      : defaultUserInfo;
    setUserInfo({ ...src, shippingAddress: { ...src.shippingAddress } });
    setUser(src);
  };

  const changesHandler = (e) => {
    e.persist();
    setChange(true);
    value = e.target.value;
    newUser = user;
    switch (e.target.name) {
      case 'name':
        setUser({ ...user, name: value });
        break;
      case 'email':
        setUser({ ...user, email: value });
        break;
      case 'admin':
        setConfirmModal({
          ...confirmModal,
          display: true,
          message: user.isAdmin ? fire : promote,
          variant: user.isAdmin ? 'danger' : 'info',
        });
        break;
      case 'address':
        newUser.shippingAddress.address = value;
        setUser(newUser);
        break;
      case 'city':
        newUser.shippingAddress.city = value;
        setUser(newUser);
        break;
      case 'postalCode':
        newUser.shippingAddress.postalCode = value;
        setUser(newUser);
        break;
      case 'country':
        newUser.shippingAddress.country = value;
        setUser(newUser);
        break;
    }
  };

  const hide = () => {
    setModal({ display: false, userInfo: defaultUserInfo });
    setChange(false);
  };

  const msgHandler = (msg, variant) => {
    setFlashMsg({ display: true, msg, variant });
    setTimeout(() => {
      setFlashMsg({ ...msg, display: false });
    }, 3000);
  };

  const rxReset = (payload) => {
    dispatch({
      type: ADMIN_USER_UPDATE_RESET,
      payload,
    });
  };

  const adminChangeProceed = (e) => {
    e.preventDefault();
    setUser({ ...user, isAdmin: !user.isAdmin });
    hideModal();
  };

  const hideModal = () => {
    setConfirmModal({ ...confirmModal, display: false });
  };

  const functions = {
    changesHandler,
    submitHandler,
  };

  const values = { ...user, change };

  return (
    <Modal
      show={modal.display}
      onHide={hide}
      dialogClassName='modal-90w'
      aria-labelledby='example-custom-modal-styling-title'
    >
      <ConfirmModal
        active={confirmModal.display}
        heading={confirmModal.heading}
        message={confirmModal.message}
        confirmHandler={adminChangeProceed}
        hideHandler={hideModal}
        proceedText='Confirm'
        primaryVariant={confirmModal.variant}
      />
      <Modal.Header closeButton>
        <Modal.Title id='example-custom-modal-styling-title'>
          Updating: {userInfo.name}
        </Modal.Title>
      </Modal.Header>
      {loading && <Spinner />}
      {flashMsg.display && (
        <Message variant={flashMsg.variant}>{flashMsg.msg}</Message>
      )}
      <Modal.Body variant='flush'>
        <AdminUserUpdateForm values={values} functions={functions} />
      </Modal.Body>
    </Modal>
  );
};

UserEditPopup.defaultProps = {
  active: false,
  modal: {
    display: false,
    userInfo: defaultUserInfo,
  },
};

export default UserEditPopup;
