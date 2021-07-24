// libraries & methods
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// UI components
import { Table } from 'react-bootstrap';
import {
  Auth,
  Message,
  Loader,
  Spinner,
  Exceptional,
  UserEditPopup,
} from '../../components';

// redux actions
import { listUsers, deleteUser } from '../../actions/adminActions';
import {
  ADMIN_USER_DELETE_RESET,
  ADMIN_USER_UPDATE_RESET,
} from '../../constants';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const {
    loading: listLoading,
    error: listRequestError,
    users,
  } = useSelector((state) => state.userList);
  const {
    loading: deleteLoading,
    success: deleted,
    error: deleteError,
    message,
  } = useSelector((state) => state.adminUserDelete);
  const { success: updated } = useSelector((state) => state.adminUserUpdate);

  const [flashMsg, setFlashMsg] = useState({});
  const [modal, setModal] = useState({
    display: false,
    userInfo: null,
  });

  useEffect(() => {
    (!users || users.length === 0) && dispatch(listUsers());

    if (deleted || deleteError) {
      deleted ? msgHandler(message) : msgHandler(deleteError, 'danger', 3);
      dispatch({ type: ADMIN_USER_DELETE_RESET });
    }

    if (updated) {
      msgHandler('Updated successfully');
      dispatch({ type: ADMIN_USER_UPDATE_RESET });
    }

    return () => axios.CancelToken.source().cancel();
  }, [dispatch, deleted, deleteError, updated]);

  const deleteHandler = (id, name = 'undefined') => {
    const c = `Are you sure to delete ${name}?`;
    window.confirm(c) && dispatch(deleteUser(id));
  };

  const msgHandler = (msg, variant = 'success', s = 2) => {
    setFlashMsg({ display: true, variant, msg });
    setTimeout(() => setFlashMsg({}), s * 1000);
  };

  const modalHandler = (userInfo, display = true) => {
    setModal({ display, userInfo });
  };

  return (
    <Auth history={history} adminOnly>
      {listLoading ? (
        <Loader />
      ) : listRequestError ? (
        <Message variant='danger'>{listRequestError}</Message>
      ) : users && users.length > 0 ? (
        <>
          <h1>Users</h1>
          {flashMsg.display && (
            <Message variant={flashMsg.variant}>{flashMsg.msg}</Message>
          )}
          {deleteLoading && <Spinner />}
          <Table responsive className='tale-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className={user.isAdmin ? 'adminRow' : ''}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.shippingAddress ? (
                      <>
                        {user.shippingAddress.address},{' '}
                        {user.shippingAddress.city},{' '}
                        {user.shippingAddress.postalCode},{' '}
                        {user.shippingAddress.country}
                      </>
                    ) : (
                      <p></p>
                    )}
                  </td>
                  <td>
                    <div className='two-horizontal-icons'>
                      <div>
                        <i
                          onClick={() => modalHandler(user)}
                          className='fas fa-edit'
                        ></i>
                      </div>
                      <div>
                        <i
                          onClick={() => deleteHandler(user._id, user.name)}
                          className='fas fa-trash'
                        ></i>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <UserEditPopup modal={modal} setModal={setModal} />
        </>
      ) : (
        <Exceptional />
      )}
    </Auth>
  );
};

export default UserListScreen;
