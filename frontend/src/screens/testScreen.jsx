import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Row, Col, Nav, Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { OrdersFilter, OrdersSort } from '../components'
import { CART_REMOVE_ITEMS } from '../constants'

const TestScreen = ({ history, match }) => {
  const people = ['Beck', 'Tom']
  const dispatch = useDispatch()
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
    // console.log(playGroundFunc())
    // return () => window.removeEventListener('click', dropMenuHandler);
  }, [])

  const changeStatus = (value) => setStatus(value * 3)

  const clickMe = () => {
    setPositive(true)
    // dispatch({
    //   type: CART_REMOVE_ITEMS,
    //   payload: {
    //     cartItems: [
    //       { _id: '6029cc67b609791d0b935680' },
    //       { _id: '6029cc67b609791d0b93567e' },
    //     ],
    //   },
    // })
  }

  const playGroundFunc = () => {
    return true
  }

  return (
    <>
      <h1>Welcome to test page</h1>
      <p>playground for testing stuff</p>
      {positive && <p>positive</p>}
      <button onClick={clickMe} clasName='btn btn-success'>
        Click me
      </button>
    </>
  )
}

export default TestScreen
