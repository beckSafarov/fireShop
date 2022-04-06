import { useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'
import SearchBox from '../Search/SearchBox'

const menuLinks = [
  { to: '/profile', label: 'Profile' },
  { to: '/myorders', label: 'My Orders' },
  { to: '/purchases', label: 'My Purchases' },
  { to: '/reviews', label: 'My Reviews' },
]

const adminMenuLinks = [
  { to: '/admin/userslist', label: 'Users List' },
  { to: '/admin/productlist', label: 'Product List' },
  { to: '/admin/orderslist', label: 'Orders List' },
]

const Header = () => {
  const dispatch = useDispatch()
  const [keyReset, setKeyReset] = useState(false)
  const { userInfo } = useSelector((state) => state.userLogin)
  const cart = useSelector((state) => state.cart)
  const cartItems = cart?.cartItems || []

  const handleLogout = () => dispatch(logout())

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
                    {cartItems.length || ''}
                  </Badge>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  {menuLinks.map((link, i) => (
                    <LinkContainer to={link.to} key={i}>
                      <NavDropdown.Item>{link.label}</NavDropdown.Item>
                    </LinkContainer>
                  ))}
                  <NavDropdown.Item key={5} onClick={handleLogout}>
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
              {userInfo?.isAdmin && (
                <NavDropdown title='Admin Menu' id='username'>
                  {adminMenuLinks.map((link, i) => (
                    <LinkContainer key={i} to={link.to}>
                      <NavDropdown.Item>{link.label}</NavDropdown.Item>
                    </LinkContainer>
                  ))}
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
