// libraries & methods
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// UI components
import Modal from 'react-bootstrap/Modal';
import { Message, Spinner, ConfirmModal } from '..';
import { AdminUserUpdateForm } from '../Forms';

// helpers
import ObjectsCompare from '../../helpers/ObjectsCompare';

// redux actions
import { ADMIN_USER_UPDATE_RESET } from '../../constants';
import { adminUpdateUser } from '../../actions/adminActions';
import FieldsValidated from '../../helpers/FieldsValidated';
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
    modal && modal.userInfo && initValues();
    updated && hide();

    if (error) {
      msgHandler(error, 'danger');
      rxReset('error');
    }
  }, [modal, updated, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    const changed = ObjectsCompare(user, userInfo);
    if (changed) {
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

  const initValues = (fromModal = true) => {
    const src = {
      ...modal.userInfo,
      shippingAddress: {
        ...modal.userInfo.shippingAddress,
      },
    };
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
    hideConfirmWindow();
  };

  const hideConfirmWindow = () => {
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
        hideHandler={hideConfirmWindow}
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
