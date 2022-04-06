// Methods
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

//redux actions
import { getMe } from './actions/userActions'

// UI components
import { Container } from 'react-bootstrap'
import { Header, Footer, Spinner, FlashMsg } from './components'
import { BrowserRouter as Router } from 'react-router-dom'

// Screens
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/auth/LoginScreen'
import RegisterScreen from './screens/auth/RegisterScreen'
import ProfileScreen from './screens/user/ProfileScreen'
import ShippingScreen from './screens/order/ShippingScreen'

import PaymentScreen from './screens/payment/PaymentScreen'
import PlaceOrderScreen from './screens/order/PlaceOrderScreen'
import PaymentSuccess from './screens/payment/PaymentSuccess'
import PaymentFailure from './screens/payment/PaymentFailure'
import UserOrdersScreen from './screens/user/UserOrdersScreen'
import OrderInfoScreen from './screens/user/OrderInfoScreen'
import ShaddressScreen from './screens/user/ShaddressScreen'
import testScreen from './screens/testScreen'
import { getCart } from './helpers/cartLCS'
import { addToCart } from './actions/cartActions'
import UserListScreen from './screens/admin/UserListScreen'
import ProductListScreen from './screens/admin/ProductListScreen'
import ProductEditScreen from './screens/admin/ProductEditScreen'
import OrdersListScreen from './screens/admin/OrdersListScreen'
import SearchScreen from './screens/SearchScreen'
import Rowt from './components/Rowt'

const routes = {
  public: [
    { path: '/', component: HomeScreen, exact: true },
    { path: '/search', component: SearchScreen },
    { path: '/product/:id', component: ProductScreen },
    { path: '/cart/:id?', component: CartScreen },
  ],
  auth: [
    { path: '/register', component: RegisterScreen },
    { path: '/signin', component: LoginScreen },
    { path: '/signin?redirect=:redirect', component: LoginScreen },
  ],
  user: [
    { path: '/profile', component: ProfileScreen },
    { path: '/address', component: ShaddressScreen },
    { path: '/myorders', component: UserOrdersScreen, exact: true },
    { path: '/orders/:id', component: OrderInfoScreen },
    { path: '/placeorder', component: PlaceOrderScreen },
    { path: '/shipping', component: ShippingScreen },
    { path: '/payment', component: PaymentScreen },
    { path: '/payment-success', component: PaymentSuccess },
    { path: '/payment-failure', component: PaymentFailure },
  ],
  admin: [
    { path: '/userslist', component: UserListScreen },
    { path: '/productlist', component: ProductListScreen },
    { path: '/productedit/:id', component: ProductEditScreen },
    { path: '/orderslist', component: OrdersListScreen },
  ],
}

const App = () => {
  const dispatch = useDispatch()
  const { loading: cartLoading } = useSelector((state) => state.cart)
  const { loading: userLoading, userInfo } = useSelector(
    (state) => state.userLogin
  )
  const lcc = getCart()
  const online = window?.navigator?.onLine || true
  const loading = userLoading || cartLoading || false

  useEffect(() => {
    userInfo === null && dispatch(getMe())
    if (userInfo && lcc.length > 0) {
      dispatch(addToCart(lcc, true, true))
    }
    return () => axios.CancelToken.source().cancel()
  }, [dispatch, userInfo])

  return (
    <Router>
      <Header />
      <main className='py-3'>
        {loading && online ? (
          <Spinner />
        ) : !online ? (
          <Container>
            <FlashMsg variant='danger' permanent>
              You are offline!
            </FlashMsg>
          </Container>
        ) : (
          <Container id='container'>
            {routes.public.map((route, i) => (
              <Rowt
                key={i}
                path={route.path}
                component={route.component}
                exact={route.exact}
                open
              />
            ))}

            {routes.auth.map((route, i) => (
              <Rowt
                key={i}
                path={route.path}
                component={route.component}
                unloggedOnly
              />
            ))}

            {routes.user.map((route, i) => (
              <Rowt
                key={i}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ))}

            {routes.admin.map((route, i) => (
              <Rowt
                key={i}
                adminOnly
                path={`/admin${route.path}`}
                component={route.component}
              />
            ))}

            {/*test route */}
            {process.env.NODE_ENV === 'development' && (
              <Rowt path='/test' component={testScreen} open />
            )}
          </Container>
        )}
      </main>
      <Footer />
    </Router>
  )
}

export default App
