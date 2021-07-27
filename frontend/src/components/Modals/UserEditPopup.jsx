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
import { ADMIN_USER_UPDATE_RESET as updateReset } from '../../constants';
import { adminUpdateUser } from '../../actions/adminActions';
import FieldsValidated from '../../helpers/FieldsValidated';
const defaultFields = {
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
  const [userInfo, setUserInfo] = useState(defaultFields);
  const [user, setUser] = useState(defaultFields);
  const [change, setChange] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    heading: 'Admin Privilege Changes',
  });
  const [flashMsg, setFlashMsg] = useState({});
  const fire = `Are you sure to revoke ${userInfo.name}'s admin rights?`;
  const promote = `Are you sure to give ${userInfo.name} admin privileges?`;
  let value, newUser, fieldName;

  useEffect(() => {
    modal && modal.userInfo && initValues();
    updated && hide();

    if (error) {
      msgHandler(error, 'danger');
      dispatch({ type: updateReset, payload: 'error' });
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

  const initValues = () => {
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
    newUser = { ...user };
    fieldName = e.target.name;
    value = e.target.value;
    switch (fieldName) {
      case 'name':
      case 'email':
        newUser[fieldName] = value;
        setUser(newUser);
        break;
      case 'admin':
        setConfirmModal({
          ...confirmModal,
          display: true,
          message: user.isAdmin ? fire : promote,
          variant: user.isAdmin ? 'danger' : 'info',
        });
        break;
      default:
        newUser.shippingAddress[fieldName] = value;
        setUser(newUser);
        break;
    }
  };

  const hide = () => {
    setModal({ display: false, userInfo: defaultFields });
    setChange(false);
  };

  const msgHandler = (msg, variant) => {
    setFlashMsg({ display: true, msg, variant });
    setTimeout(() => {
      setFlashMsg({ ...msg, display: false });
    }, 3000);
  };

  const adminChangeProceed = (e) => {
    e.preventDefault();
    setUser({ ...user, isAdmin: !user.isAdmin });
    hideConfirmWindow();
  };

  const hideConfirmWindow = () =>
    setConfirmModal({ ...confirmModal, display: false });

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
        <AdminUserUpdateForm
          values={values}
          functions={(changesHandler, submitHandler)}
        />
      </Modal.Body>
    </Modal>
  );
};

UserEditPopup.defaultProps = {
  active: false,
  modal: {
    display: false,
    userInfo: defaultFields,
  },
};

export default UserEditPopup;
