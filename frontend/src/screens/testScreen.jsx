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

const TestScreen = ({ location, history, match }) => {
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
    console.log(everSince())
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
    const date = new Date()
    return date.getFullYear()
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

      {msg.display && <Message variant={msg.variant}>{msg.msg}</Message>}
      {positive && <Spinner />}
      <Col>
        <Row>
          <Form.Control
            as='select'
            defaultValue={status}
            onChange={(e) => changeStatus(e.target.value)}
          >
            <option key={1} value={1}>
              {1}
            </option>
            <option key={2} value={2}>
              {2}{' '}
            </option>
            <option key={3} value={3}>
              {3}
            </option>
          </Form.Control>

          <Button variant='success' onClick={clickMe}>
            Click me
          </Button>
        </Row>
      </Col>
      {/* <ConfirmModal active proceedText='Delete' primaryVariant='danger' /> */}
      <Col>
        <Row>
          <h2>Status: {status}</h2>
        </Row>
      </Col>
      <DeliveryProgress height={100} width={520} progress={3} />
    </>
  )
}

export default TestScreen
