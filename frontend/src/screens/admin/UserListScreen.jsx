// libraries & methods
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

// UI components
import { Table } from 'react-bootstrap'
import {
  Auth,
  Message,
  Loader,
  Spinner,
  Exceptional,
  SearchUser,
} from '../../components'

// redux actions
import { listUsers, deleteUser, searchUser } from '../../actions/adminActions'
import {
  ADMIN_SEARCH_PROPERTY_RESET,
  ADMIN_SEARCH_USER_RESET,
  ADMIN_USER_DELETE_RESET,
  ADMIN_USER_UPDATE_RESET,
} from '../../constants'
import UserEditModal from '../../components/Modals/UserEditModal'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  // all users store
  const {
    loading: listLoading,
    error: listRequestError,
    users: allUsers,
  } = useSelector((state) => state.userList)

  // user delete store
  const {
    loading: deleteLoading,
    success: deleted,
    error: deleteError,
    message,
  } = useSelector((state) => state.adminUserDelete)

  // search user store
  const {
    loading: searchLoading,
    users: searchedUsers,
    error: searchFailed,
  } = useSelector((state) => state.adminSearchUserStore)
  const [users, setUsers] = useState([])

  const { success: updated } = useSelector((state) => state.adminUserUpdate)

  const [flashMsg, setFlashMsg] = useState({})

  const [modal, setModal] = useState({
    display: false,
    userInfo: null,
  })

  // variables
  const listAllUsers = (!allUsers || allUsers.length === 0) && !searchedUsers

  useEffect(() => {
    listAllUsers ? dispatch(listUsers()) : setUsers(allUsers)

    if (deleted || deleteError) {
      deleted ? msgHandler(message) : msgHandler(deleteError, 'danger', 3)
      dispatch({ type: ADMIN_USER_DELETE_RESET })
    }

    if (updated) {
      msgHandler('Updated successfully')
      dispatch({ type: ADMIN_USER_UPDATE_RESET })
    }

    searchedUsers && setUsers(searchedUsers)
    if (searchFailed) {
      msgHandler(searchFailed, 'danger', 3)
      dispatch({
        type: ADMIN_SEARCH_PROPERTY_RESET,
        payload: 'error',
      })
    }

    return () => {
      axios.CancelToken.source().cancel()
      searchedUsers && handleClearSearch()
    }
  }, [
    dispatch,
    deleted,
    deleteError,
    updated,
    allUsers,
    searchedUsers,
    searchFailed,
  ])

  const deleteHandler = (id, name = 'undefined') => {
    const c = `Are you sure to delete ${name}?`
    window.confirm(c) && dispatch(deleteUser(id))
  }

  const msgHandler = (msg, variant = 'success', s = 2) => {
    setFlashMsg({ display: true, variant, msg })
    setTimeout(() => setFlashMsg({}), s * 1000)
  }

  const modalHandler = (userInfo, display = true) =>
    setModal({ display, userInfo })

  const handleSearch = (q) => {
    dispatch(searchUser(q.searchBy, q.searchAddressBy, q.keyword))
  }

  const handleClearSearch = () => dispatch({ type: ADMIN_SEARCH_USER_RESET })

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
          <div className='py-4'>
            <SearchUser onSearch={handleSearch} onClear={handleClearSearch} />
          </div>

          {deleteLoading || (searchLoading && <Spinner />)}
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
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>
                    {user.name}{' '}
                    {user.isAdmin && (
                      <i
                        style={{ color: '#00cc66', fontSize: '10px' }}
                        className='fas fa-check-circle'
                      ></i>
                    )}
                  </td>
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
          <UserEditModal
            modal={modal}
            onClose={() => setModal({ display: false })}
          />
        </>
      ) : (
        <Exceptional />
      )}
    </Auth>
  )
}

export default UserListScreen
