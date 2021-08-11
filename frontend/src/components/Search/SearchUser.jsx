import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
const defaults = {
  keyword: '',
  field: 'name',
  secondField: 'city',
}

const SearchUser = ({ onSearch, onClear, bordered, rounded }) => {
  const [queries, setQueries] = useState(defaults)
  const [showCancel, setShowCancel] = useState(false)
  let newQueries = {}

  const changesHandler = (e) => {
    newQueries = { ...queries }
    newQueries[e.target.name] = e.target.value
    setQueries(newQueries)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    queries.keyword && onSearch(queries) && setShowCancel(true)
  }

  const clearHandler = () => {
    setQueries(defaults)
    onClear()
    setShowCancel(false)
  }

  return (
    <Form onSubmit={submitHandler}>
      <Row>
        <Col md={5}>
          <Form.Control
            type='text'
            name='keyword'
            onChange={changesHandler}
            placeholder='Search Users...'
            value={queries.keyword}
            className={`${bordered && 'bordered'} ${rounded && 'rounded'}`}
          ></Form.Control>
        </Col>
        <Col md={3}>
          <Form.Control
            as='select'
            name='field'
            defaultValue={queries.field}
            onChange={changesHandler}
            className={`${bordered && 'bordered'} ${rounded && 'rounded'}`}
          >
            <option key={1} value={'_id'}>
              By ID
            </option>
            <option key={2} value={'name'}>
              By Name
            </option>
            <option key={3} value={'email'}>
              By Email
            </option>
            <option key={4} value={'address'}>
              By Shipping Address
            </option>
          </Form.Control>
        </Col>
        {queries.field === 'address' && (
          <Col md={2}>
            <Form.Control
              as='select'
              name='secondField'
              defaultValue={queries.secondField}
              onChange={changesHandler}
              className={`${bordered && 'bordered'} ${rounded && 'rounded'}`}
            >
              <option key={1} value={'address'}>
                By Address
              </option>
              <option key={2} value={'city'}>
                By City
              </option>
              <option key={3} value={'country'}>
                By Country
              </option>
              <option key={4} value={'postalCode'}>
                By Postal Code
              </option>
            </Form.Control>
          </Col>
        )}
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

SearchUser.defaultProps = {
  onSearch: () => false,
  onClear: () => false,
  bordered: true,
  rounded: true,
}

export default withRouter(SearchUser)
