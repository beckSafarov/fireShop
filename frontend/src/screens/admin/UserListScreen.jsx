// libraries & methods
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../../components/Auth';

// UI components
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Table, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import Spinner from '../../components/Spinner';
import Exceptional from '../../components/Exceptional';

// redux actions
import { listUsers, deleteUser } from '../../actions/adminActions';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading: listLoading, error, users } = userList;
  const {
    loading: deleteLoading,
    success: deleteSuccess,
    message,
    error: deleteError,
  } = useSelector((state) => state.userDelete);
  const [flashMsg, setFlashMsg] = useState({
    display: false,
    variant: 'info',
    msg: '',
  });

  useEffect(() => {
    if (!users || users.length === 0) dispatch(listUsers());

    if (deleteSuccess) flashMsgHandler('success', message);

    if (deleteError) flashMsgHandler('danger', deleteError);
  }, [dispatch, deleteSuccess, deleteError]);

  const deleteHandler = (id, name = 'undefined') => {
    const c = `Are you sure to delete ${name}?`;
    if (window.confirm(c)) dispatch(deleteUser(id));
  };

  const flashMsgHandler = (variant, msg, seconds = 3) => {
    setFlashMsg({ display: true, variant, msg });
    setTimeout(() => {
      setFlashMsg({ ...flashMsg, display: false });
    }, seconds * 1000);
  };

  return (
    <Auth history={history} adminOnly>
      {listLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : users ? (
        <>
          <h1>Users</h1>
          {flashMsg.display && (
            <Message variant={flashMsg.variant}>{flashMsg.msg}</Message>
          )}
          {deleteLoading && <Spinner />}
          <Table striped bordered responsive className='tale-sm'>
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
                    {user.shippingAddress.address}, {user.shippingAddress.city},{' '}
                    {user.shippingAddress.postalCode},{' '}
                    {user.shippingAddress.country}
                  </td>
                  <td>
                    <div className='two-horizontal-icons'>
                      <div>
                        <Link to={`/users/${user._id}/edit`}>
                          <i className='fas fa-edit'></i>
                        </Link>
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
        </>
      ) : (
        <Exceptional />
      )}
    </Auth>
  );
};

export default UserListScreen;
