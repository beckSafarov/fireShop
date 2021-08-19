import { useState } from 'react'
import { Form, Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import AdminProductSearch from '../../Search/AdminProductSearch'
import FilterByAddress from './FilterByAddress'
import FilterByDate from './FilterByDate'
import FilterByPrice from './FilterByPrice'
const checkBoxes = ['Customer', 'Product', 'Address', 'Date', 'Price']

const OrdersFilter = ({ onSubmit }) => {
  const [checked, setChecked] = useState(0)
  // const [clearFields, setClearFields] = useState(false)

  const checkHandler = (e) => {
    e.preventDefault()
    setChecked(Number(e.target.id))
  }

  const formDisplaySwitcher = () => {
    switch (checked) {
      case 0:
        return (
          <AdminProductSearch
            onSearch={customerFilterSubmit}
            placeholder={'e.g. John Doe'}
            buttonText='Filter'
            buttonClass='outline-success'
          />
        )
      case 1:
        return (
          <AdminProductSearch
            onSearch={productFilterSubmit}
            placeholder={'e.g. iphone'}
            buttonText='Filter'
            buttonClass='outline-success'
          />
        )
      case 2:
        return <FilterByAddress onSubmit={addressFilterSubmit} />
      case 3:
        return <FilterByDate onSubmit={dateFilterSubmit} />
      case 4:
        return <FilterByPrice onSubmit={priceFilterSubmit} />
    }
  }

  const customerFilterSubmit = (keyword) =>
    onSubmit(`?filter=user?user=${keyword}`)

  const productFilterSubmit = (keyword) => {
    onSubmit(`?filter=orderItems?orderItems=${keyword}`)
  }

  const addressFilterSubmit = (query) => {
    onSubmit(
      `?filter=shippingAddress?shippingAddress=${query.category}.${query.keyword}`
    )
  }

  const dateFilterSubmit = (query) => {
    onSubmit(`?filter=${query.category}?${query.category}=${query.time}`)
  }

  const priceFilterSubmit = (query) => {
    const firstParam = `${query[0].category}=${query[0].value}`
    const secondParam =
      query.length > 1 ? `&${query[1].category}=${query[0].value}` : ''
    onSubmit(`?filter=price&${firstParam}${secondParam}`)
  }

  const onClear = () => {
    console.log('you cleared it')
  }

  return (
    <>
      <ButtonGroup>
        {checkBoxes.map((name, index) => (
          <Button
            variant='secondary'
            id={index}
            key={index}
            disabled={checked === index}
            onClick={checkHandler}
          >
            {name}
          </Button>
        ))}
      </ButtonGroup>
      <div className='py-4'>{formDisplaySwitcher()}</div>
    </>
  )
}

OrdersFilter.defaultProps = {
  onSubmit: (query) => console.log(query),
}

export default OrdersFilter
