import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

const AdminSearch = ({
  onSearch,
  onClear,
  bordered,
  rounded,
  reset,
  setReset,
  placeholder,
}) => {
  const [keyword, setKeyWord] = useState('')
  const [showCancel, setShowCancel] = useState(false)

  useEffect(() => {
    if (reset) {
      clearHandler()
      setReset(false)
    }
  }, [reset])

  const changesHandler = (e) => setKeyWord(e.target.value)

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword) {
      onSearch(keyword)
      setShowCancel(true)
    }
  }

  const clearHandler = () => {
    setKeyWord('')
    onClear()
    setShowCancel(false)
  }

  return (
    <Form onSubmit={submitHandler}>
      <Row>
        <Col md={10}>
          <Form.Control
            type='text'
            onChange={changesHandler}
            placeholder='Search Product...'
            value={keyword}
            className={`${bordered && 'bordered'} ${rounded && 'rounded'}`}
          ></Form.Control>
        </Col>
        <Col md={1}>
          <Button type='submit' variant='outline-info' className='p-2 rounded'>
            Search
          </Button>
        </Col>
        {showCancel && (
          <Col md={1}>
            <Button
              type='button'
              variant='outline-dark'
              className='p-2 rounded'
              onClick={clearHandler}
            >
              Clear
            </Button>
          </Col>
        )}
      </Row>
    </Form>
  )
}

AdminSearch.defaultProps = {
  onSearch: () => false,
  onClear: () => false,
  reset: false,
  setReset: () => false,
  placeholder: 'Search Product...',
  bordered: true,
  rounded: true,
}

export default withRouter(AdminSearch)
