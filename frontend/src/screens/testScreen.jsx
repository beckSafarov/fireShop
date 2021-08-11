import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Row, Col, Nav, Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import * as lcs from '../helpers/cartLCS'
import { LinkContainer } from 'react-router-bootstrap'
import { DropMenu, DropLink } from '../components/Dropdown'
import { Auth, Message, Spinner, Loader, ConfirmModal } from '../components'
import DeliveryProgress from '../components/Product/DeliveryProgress'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import pluralize from '../helpers/pluralize'
import Review from '../components/Modals/Review'
import AdminSearch from '../components/globals/AdminSearch'

const TestScreen = ({ history, match }) => {
  const people = ['Beck', 'Tom']
  const [status, setStatus] = useState(10)
  const [positive, setPositive] = useState(false)
  const [msg, setMsg] = useState({})
  const [modal, setModal] = useState({
    display: false,
    info: {
      isDelivered: false,
      deliveryStatus: 'Packed',
    },
  })

  useEffect(() => {
    // console.log(everSince())
    // console.log(playGroundFunc())
    // window.addEventListener('click', dropMenuHandler);
    // return () => window.removeEventListener('click', dropMenuHandler);
  }, [])

  const changeStatus = (value) => setStatus(value * 3)

  const clickMe = () => {
    // setModal({ ...modal, display: true })
    setPositive(true)
  }

  const playGroundFunc = () => {
    // const date = new Date()

    return pluralize(10, 'review')
  }

  const msgHandler = () => {
    setMsg({ display: true, msg: 'Awesome', variant: 'success' })
    setTimeout(() => setMsg({}), 3000)
  }

  const everSince = () => {
    const then = new Date('2021')
    const now = new Date()
    dayjs.extend(relativeTime)
    return dayjs(then).from(now)
  }

  return (
    <>
      <h1>Welcome to test page</h1>
      <p>playground for testing stuff</p>
      {positive && <p>positive</p>}

      <AdminSearch
        page={'testscreen'}
        reset={positive}
        setKeyReset={setPositive}
      />
    </>
  )
}

export default TestScreen
