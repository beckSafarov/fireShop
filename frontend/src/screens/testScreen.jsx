import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TestScreen = ({ history, match }) => {
  const people = ['Beck', 'Tom']
  const dispatch = useDispatch()
  const [status, setStatus] = useState(10)
  const [positive, setPositive] = useState(false)
  const [msg, setMsg] = useState('Tample Message')
  const [modal, setModal] = useState({
    display: false,
    info: {
      isDelivered: false,
      deliveryStatus: 'Packed',
    },
  })

  // useEffect(() => {
  // }, [])

  const changeStatus = (value) => setStatus(value * 3)

  const clickMe = () => {
    setMsg('Again temple msg')
  }

  const playGroundFunc = () => {
    return true
  }

  return (
    <>
      <h1>Welcome to test page</h1>
      <p>playground for testing stuff</p>
      {positive && <p>positive</p>}
      <button onClick={clickMe} className='btn btn-success'>
        Click me
      </button>
    </>
  )
}

export default TestScreen
