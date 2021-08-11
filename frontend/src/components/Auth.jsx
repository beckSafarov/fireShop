import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Loader } from '../components'

const Auth = ({ children, history, reverse, adminOnly }) => {
  const [permit, setPermit] = useState(false)
  const { loading, userInfo: logged } = useSelector((state) => state.userLogin)
  const { location: loc } = history

  let queryRedirect = new URLSearchParams(loc.search).get('redirect')
  if (queryRedirect === '/') queryRedirect = ''

  useEffect(() => {
    if (!reverse) {
      if (loading !== undefined && logged) {
        adminOnly
          ? logged.isAdmin
            ? setPermit(true)
            : history.push('/')
          : setPermit(true)
      } else if (loading !== undefined && !logged) {
        history.push('/')
      }
    } else {
      !logged
        ? setPermit(true)
        : history.push(queryRedirect ? `/${queryRedirect}` : '/')
    }
  }, [logged, reverse])

  const push = (text) => console.log(text)

  return <>{loading ? <Loader /> : permit ? <>{children}</> : <p></p>}</>
}

Auth.defaultProps = {
  children: <h1>Plain Auth Wrapper</h1>,
  history: {
    location: { pathname: '/' },
    push: (loc = '/') => (window.location.href = loc),
  },
  reverse: false,
  adminOnly: false,
}

export default Auth
