import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

const AdminProductSearch = ({
  onSearch,
  onClear,
  bordered,
  rounded,
  reset,
  setReset,
  placeholder,
  buttonText,
  buttonClass,
}) => {
  const [keyword, setKeyWord] = useState('')
  const [showCancel, setShowCancel] = useState(false)
  const [submittable, setSubmittable] = useState(true)

  useEffect(() => {
    if (reset) {
      clearHandler()
      setReset(false)
    }
    setSubmittable(keyword ? true : false)
  }, [reset, keyword])

  const changesHandler = (e) => setKeyWord(e.target.value)

  const submitHandler = (e) => {
    e.preventDefault()
    onSearch(keyword)
    setShowCancel(true)
  }

  const clearHandler = () => {
    setKeyWord('')
    onClear()
    setShowCancel(false)
  }

  return (
    <Form onSubmit={submitHandler}>
      <Row>
        <Col md={8}>
          <Form.Control
            type='text'
            onChange={changesHandler}
            placeholder={placeholder}
            value={keyword}
            className={`${bordered && 'bordered'} ${rounded && 'rounded'}`}
          ></Form.Control>
        </Col>
        <Col md={2}>
          <Button
            type='submit'
            variant={buttonClass}
            className='p-2 rounded'
            disabled={!submittable}
            block
          >
            {buttonText}
          </Button>
        </Col>
        {showCancel && (
          <Col md={2}>
            <Button
              type='button'
              variant='outline-dark'
              className='p-2 rounded'
              onClick={clearHandler}
              block
            >
              Clear
            </Button>
          </Col>
        )}
      </Row>
    </Form>
  )
}

AdminProductSearch.defaultProps = {
  onSearch: () => false,
  onClear: () => false,
  reset: false,
  setReset: () => false,
  placeholder: 'Search Product...',
  buttonText: 'Search',
  buttonClass: 'outline-info',
  bordered: true,
  rounded: true,
}

export default withRouter(AdminProductSearch)
