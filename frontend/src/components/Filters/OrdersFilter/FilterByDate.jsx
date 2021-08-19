import { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

const FilterByDate = ({ onSubmit }) => {
  const [category, setCategory] = useState('ordered')
  const [time, setTime] = useState('day')

  const submitHandler = (e) => {
    e.preventDefault()
    onSubmit({ time, category })
  }

  return (
    <Form onSubmit={submitHandler}>
      <Row>
        <Col md={5} lg={5} sm={12}>
          <Form.Control
            as='select'
            name='status'
            defaultValue={category}
            className={'bordered rounded'}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option key={1} value={'ordered'}>
              Ordered
            </option>
            <option key={2} value={'delivered'}>
              Delivered
            </option>
          </Form.Control>
        </Col>
        <Col md={5} lg={5} sm={12}>
          <Form.Control
            as='select'
            name='time'
            defaultValue={time}
            className={'bordered rounded'}
            onChange={(e) => setTime(e.target.value)}
          >
            <option key={1} value={'day'}>
              a day ago
            </option>
            <option key={2} value={'week'}>
              a week ago
            </option>
            <option key={3} value={'month'}>
              a month ago
            </option>
            <option key={4} value={'year'}>
              a year ago
            </option>
          </Form.Control>
        </Col>
        <Col md={2} lg={2} sm={12}>
          <Button
            type='submit'
            variant='outline-success'
            className='p-2 rounded btn-block'
          >
            Filter
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

FilterByDate.defaultProps = {
  onSubmit: () => false,
}

export default FilterByDate
