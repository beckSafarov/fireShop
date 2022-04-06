import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { getURLParam } from '../helpers/utilities'
import Loader from './globals/Loader'

const Rowt = ({
  component: Component,
  open,
  unloggedOnly,
  adminOnly,
  ...rest
}) => {
  const { loading, userInfo: logged } = useSelector((state) => state.userLogin)

  const [permit, setPermit] = useState(null)
  const [redirect, setRedirect] = useState('/')

  useEffect(() => {
    if (unloggedOnly) handleUnloggedOnly()
    if (adminOnly) handleAdminOnly()
    if (open) handleOpen()

    if (!unloggedOnly && !adminOnly && !open) {
      handlePrivate()
    }
  }, [unloggedOnly, adminOnly, open, logged])

  const handleOpen = () => setPermit(true)

  const handlePrivate = () => {
    if (logged === false) {
      console.log('updating redirect')
      const currPage = window.location.href.split('/').pop()
      setRedirect(`/signin?redirect=${currPage}`)
      setPermit(false)
      return
    }
    console.log('giving permission to private')
    setPermit(true)
  }

  const getRedirectQuery = () => {
    const query = getURLParam('redirect')
    return query === '/' ? '' : query
  }

  const handleUnloggedOnly = () => {
    if (!logged) {
      setPermit(true)
      return
    }
    const redirectQuery = getRedirectQuery()
    setRedirect(`/${redirectQuery}`)
    setPermit(false)
  }

  const handleAdminOnly = () => {
    setPermit(logged && logged.isAdmin)
  }

  return (
    <Route
      {...rest}
      render={() =>
        permit ? (
          <Component />
        ) : loading || logged === null ? (
          <Loader />
        ) : (
          permit === false && (
            <>
              {console.log('redirecting')}
              <Redirect to={{ pathname: redirect }} />
            </>
          )
        )
      }
    />
  )
}

Rowt.defaultProps = {
  open: false,
  unloggedOnly: false,
  adminOnly: false,
}

export default Rowt
