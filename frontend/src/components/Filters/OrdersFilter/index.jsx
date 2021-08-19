import { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import AdminProductSearch from '../../Search/AdminProductSearch'
import FilterByAddress from './FilterByAddress'
import FilterByDate from './FilterByDate'
import FilterByPrice from './FilterByPrice'
const checkBoxes = [
  'No Filter',
  'Customer',
  'Product',
  'Address',
  'Date',
  'Price',
]

const OrdersFilter = () => {
  const [checked, setChecked] = useState(0)
  const [clearFields, setClearFields] = useState(false)

  const checkHandler = (e) => {
    setChecked(Number(e.target.id))
  }

  const formDisplaySwitcher = () => {
    switch (checked) {
      case 0:
        return <p></p>
      case 1:
        return (
          <AdminProductSearch
            onSearch={customerFilterSubmit}
            placeholder={'e.g. John Doe'}
            buttonText='Filter'
          />
        )
      case 2:
        return (
          <AdminProductSearch
            onSearch={productFilterSubmit}
            placeholder={'e.g. iphone'}
            buttonText='Filter'
          />
        )
      case 3:
        return <FilterByAddress onSubmit={addressFilterSubmit} />
      case 4:
        return <FilterByDate onSubmit={dateFilterSubmit} />
      case 5:
        return <FilterByPrice onSubmit={priceFilterSubmit} />
    }
  }

  const customerFilterSubmit = (keyword) => {
    console.log(keyword)
  }

  const productFilterSubmit = (keyword) => {
    console.log(keyword)
  }

  const addressFilterSubmit = (keyword) => {
    console.log(keyword)
  }

  const dateFilterSubmit = (keyword) => {
    console.log(keyword)
  }

  const priceFilterSubmit = (keyword) => {
    console.log(keyword)
  }

  const onClear = () => {
    console.log('you cleared it')
  }

  return (
    <>
      <Form>
        <Row>
          {checkBoxes.map((name, index) => (
            <Col md={2} lg={2} key={index}>
              <Form.Check
                inline
                label={name}
                type='radio'
                id={`${index}`}
                checked={checked === index}
                onChange={checkHandler}
              />
            </Col>
          ))}
        </Row>
      </Form>
      <div className='pt-5'>{formDisplaySwitcher()}</div>
    </>
  )
}

export default OrdersFilter
