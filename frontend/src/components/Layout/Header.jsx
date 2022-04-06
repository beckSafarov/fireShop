import { useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'
import SearchBox from '../Search/SearchBox'

const Header = () => {
  const dispatch = useDispatch()
  const [keyReset, setKeyReset] = useState(false)
  const { userInfo } = useSelector((state) => state.userLogin)
  const cart = useSelector((state) => state.cart)
  const cartItems = cart?.cartItems || []

  const logoutHandler = () => dispatch(logout())

  const searchKeyReset = () => setKeyReset(true)

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand onClick={searchKeyReset}>FireShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox reset={keyReset} setKeyReset={setKeyReset} />
            <Nav className='ml-auto'>
              {process.env.NODE_ENV === 'development' && (
                <LinkContainer to='/test'>
                  <Nav.Link>
                    <i className='fas fa-wrench'></i> Test
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart{' '}
                  <Badge pill variant='info'>
                    {cartItems.length > 0 && `${cartItems.length}`}
                  </Badge>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item key={1}>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/myorders'>
                    <NavDropdown.Item key={2}>My Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/reviews'>
                    <NavDropdown.Item key={3}>My Purchases</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/reviews'>
                    <NavDropdown.Item key={4}>My Reviews</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item key={5} onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/signin'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={'Admin Menu'} id='username'>
                  <LinkContainer to='/admin/userslist'>
                    <NavDropdown.Item key={1}>Users List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item key={2}>Product List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderslist'>
                    <NavDropdown.Item key={3}>Orders List</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
