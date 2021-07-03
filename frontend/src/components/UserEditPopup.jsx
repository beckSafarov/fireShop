// libraries & methods
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// UI components
import Message from './Message';
import Spinner from './Spinner';
import Modal from 'react-bootstrap/Modal';
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [admin, setAdmin] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [change, setChange] = useState(false);
  const [flashMsg, setFlashMsg] = useState({
    display: false,
    variant: '',
    msg: '',
  });
  const fire = `Are you sure to cancel ${userInfo.name}'s admin rights?`;
  const promote = `Are you sure to give ${userInfo.name} admin privileges?`;

  useEffect(() => {
    if (modal && modal.userInfo) resetValues();
    if (updated) {
      rxReset('success');
      hide();
    }

    if (error) {
      flashMsgHandler(error, 'danger');
      rxReset('error');
    }
  }, [modal, updated, error]);

  const madeChanges = () => {
    return (
      name !== userInfo.name ||
      email !== userInfo.email ||
      admin !== userInfo.isAdmin ||
      address !== userInfo.shippingAddress.address ||
      city !== userInfo.shippingAddress.city ||
      postalCode !== userInfo.shippingAddress.postalCode ||
      country !== userInfo.shippingAddress.country
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      name,
      email,
      isAdmin: admin,
      shippingAddress: {
        address,
        city,
        postalCode,
        country,
      },
    };

    if (madeChanges()) {
      const validated = FieldsValidated(name, email);
      if (validated.success) {
        dispatch(adminUpdateUser(userInfo._id, body));
      } else {
        flashMsgHandler(validated.message, 'danger');
        setChange(false);
      }
    } else {
      hide();
    }
  };

  const resetValues = (fromModal = true) => {
    let src = modal.userInfo;
    if (!fromModal) src = defaultUserInfo;
    setUserInfo(src);
    setName(src.name);
    setEmail(src.email);
    setAdmin(src.isAdmin);
    setAddress(src.shippingAddress.address);
    setCity(src.shippingAddress.city);
    setPostalCode(src.shippingAddress.postalCode);
    setCountry(src.shippingAddress.country);
  };

  const changesHandler = (e) => {
    e.persist();
    if (!change) setChange(true);
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'admin':
        const confirm = admin ? fire : promote;
        if (window.confirm(confirm)) setAdmin(!admin);
        break;
      case 'address':
        setAddress(e.target.value);
        break;
      case 'city':
        setCity(e.target.value);
        break;
      case 'postalCode':
        setPostalCode(e.target.value);
        break;
      case 'country':
        setCountry(e.target.value);
        break;
    }
  };

  const hide = () => {
    setModal({ display: false, userInfo: defaultUserInfo });
    setChange(false);
  };

  const flashMsgHandler = (msg, variant) => {
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

  const values = {
    name,
    email,
    admin,
    address,
    city,
    postalCode,
    country,
    change,
  };

  const functions = {
    changesHandler,
    submitHandler,
  };

  return (
    <Modal
      show={modal.display}
      onHide={hide}
      dialogClassName='modal-90w'
      aria-labelledby='example-custom-modal-styling-title'
    >
      <Modal.Header closeButton>
        <Modal.Title id='example-custom-modal-styling-title'>
          Updating: {userInfo.name}
        </Modal.Title>
      </Modal.Header>
      {loading && <Spinner />}
      {flashMsg.display && (
        <Message variant={flashMsg.variant}>{flashMsg.msg}</Message>
      )}
      <Modal.Body>
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
