import { Form, Button, Row, Col } from 'react-bootstrap'

export const ProductUpdateForm = ({ values, functions: func }) => {
  return (
    <Form onSubmit={func.submitHandler}>
      <Form.Group controlId='image'>
        <Form.File
          id='image-file'
          label={values.uploadLabel}
          custom
          onChange={func.uploadImgHandler}
          accept='image/jpg, image/jpeg, image/png'
        ></Form.File>
      </Form.Group>
      <Form.Group controlId='id'>
        <Form.Label>Product ID</Form.Label>
        <Form.Control
          type='text'
          value={values._id || ''}
          className='form-field'
          disabled
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='name'>
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type='text'
          name='name'
          defaultValue={values.name}
          className='form-field'
          onChange={func.changesHandler}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='price'>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type='number'
          name='price'
          defaultValue={values.price}
          className='form-field'
          onChange={func.changesHandler}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='user'>
        <Form.Label>User</Form.Label>
        <Form.Control
          type='text'
          value={values.user || ''}
          className='form-field'
          disabled
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='name'>
        <Form.Label>Brand</Form.Label>
        <Form.Control
          type='text'
          name='brand'
          defaultValue={values.brand}
          className='form-field'
          onChange={func.changesHandler}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='category'>
        <Form.Label>Category</Form.Label>
        <Form.Control
          type='text'
          name='category'
          defaultValue={values.category}
          className='form-field'
          onChange={func.changesHandler}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='countInStock'>
        <Form.Label>In Stock</Form.Label>
        <Form.Control
          type='number'
          name='countInStock'
          defaultValue={values.countInStock}
          className='form-field'
          onChange={func.changesHandler}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='numReviews'>
        <Form.Label>Number of Reviews</Form.Label>
        <Form.Control
          type='number'
          defaultValue={values.numReviews}
          className='form-field'
          disabled
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='description'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type='text'
          as='textarea'
          name='description'
          defaultValue={values.description}
          className='form-field'
          onChange={func.changesHandler}
          style={{ height: '100px' }}
        ></Form.Control>
      </Form.Group>
      <Row>
        <Col mb={2}>
          <Button
            type='button'
            className='rounded-btn'
            variant='dark'
            onClick={func.cancelChanges}
            disabled={!values.change}
            block
          >
            <i className='fas fa-times'></i> Cancel
          </Button>
        </Col>
        <Col mb={2}>
          <Button
            type='submit'
            className='rounded-btn'
            variant='success'
            disabled={!values.change}
            block
          >
            <i className='fas fa-save'></i> Update
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
