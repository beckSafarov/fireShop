import { Form, Button, Row, Col } from 'react-bootstrap';

export const ReadOnlyForm = ({ name, email, onClick }) => {
  return (
    <Form>
      <Form.Group as={Row} controlId='formPlaintextEmail'>
        <Form.Label column sm='2'>
          Name
        </Form.Label>
        <Col sm='10'>
          <Form.Control plaintext readOnly defaultValue={name} />
        </Col>
        <Form.Label column sm='2'>
          Email
        </Form.Label>
        <Col sm='10'>
          <Form.Control plaintext readOnly defaultValue={email} />
        </Col>
      </Form.Group>
      <div className='py-3'>
        <Button type='button' variant='info' onClick={(e) => onClick(e)} block>
          <i className='fas fa-pen'></i> Edit
        </Button>
      </div>
    </Form>
  );
};

export const ProfileUpdateForm = ({ values, functions }) => {
  const { name, email } = values;
  const {
    submitHandler,
    setName,
    setEmail,
    setPassword,
    setConfirmPass,
    cancelChanges,
  } = functions;
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId='text'>
        <Form.Label>
          Full Name<span className='danger-text'>*</span>
        </Form.Label>
        <Form.Control
          type='text'
          value={name}
          className='form-field'
          onChange={(e) => setName(e.target.value)}
        ></Form.Control>
        <Form.Label>
          Email<span className='danger-text'>*</span>
        </Form.Label>
        <Form.Control
          type='email'
          value={email}
          className='form-field'
          onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          className='form-field'
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          className='form-field'
          onChange={(e) => setConfirmPass(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Row>
        <Col mb={2}>
          <Button
            type='button'
            className='rounded-btn'
            variant='dark'
            onClick={(e) => cancelChanges(e)}
            block
          >
            <i className='fas fa-times'></i> Cancel
          </Button>
        </Col>
        <Col mb={2}>
          <Button type='submit' className='rounded-btn' variant='success' block>
            <i className='fas fa-save'></i> Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export const ShaddressReadForm = ({ values, functions, profile = true }) => {
  const { address, city, postalCode, country } = values;
  const { onClick, onProceed } = functions;

  return (
    <Form>
      <Form.Group as={Row} controlId='formPlainTextEmail'>
        <Form.Label column sm='4'>
          Address
        </Form.Label>
        <Col sm='8'>
          <Form.Control
            plaintext
            readOnly
            defaultValue={address === '' ? '-' : address}
          />
        </Col>
        <Form.Label column sm='4'>
          City
        </Form.Label>
        <Col sm='8'>
          <Form.Control
            plaintext
            readOnly
            defaultValue={city === '' ? '-' : city}
          />
        </Col>
        <Form.Label column sm='4'>
          Postal Code
        </Form.Label>
        <Col sm='8'>
          <Form.Control
            plaintext
            readOnly
            defaultValue={postalCode === '' ? '-' : postalCode}
          />
        </Col>
        <Form.Label column sm='4'>
          Country
        </Form.Label>
        <Col sm='8'>
          <Form.Control
            plaintext
            readOnly
            defaultValue={country === '' ? '-' : country}
          />
        </Col>
      </Form.Group>
      {profile ? (
        <div className='py-3'>
          <Button
            type='button'
            variant='info'
            onClick={(e) => onClick(e)}
            block
          >
            <i className='fas fa-pen'></i> Edit
          </Button>
        </div>
      ) : (
        <Row className='py-3'>
          <Col mb={2}>
            <Button
              type='button'
              variant='info'
              onClick={(e) => onClick(e)}
              block
            >
              <i className='fas fa-pen'></i> Edit
            </Button>
          </Col>
          <Col mb={2}>
            <Button
              type='button'
              variant='success'
              onClick={(e) => onProceed()}
              block
            >
              <i className='fas fa-check-circle'></i> Confirm
            </Button>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export const ShaddressUpdateForm = ({
  values,
  functions,
  addressExists = true,
}) => {
  const { address, city, postalCode, country } = values;
  const { submitHandler, changesHandler, cancelChanges } = functions;

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId='email'>
        <Form.Label>Address</Form.Label>
        <Form.Control
          type='text'
          name='address'
          defaultValue={address}
          className='form-field'
          onChange={(e) => changesHandler(e)}
          required
        ></Form.Control>
        <Form.Label>City</Form.Label>
        <Form.Control
          type='text'
          name='city'
          defaultValue={city}
          className='form-field'
          onChange={(e) => changesHandler(e)}
          required
        ></Form.Control>
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type='number'
          name='postalCode'
          defaultValue={postalCode}
          className='form-field'
          onChange={(e) => changesHandler(e)}
          required
        ></Form.Control>
        <Form.Label>Country</Form.Label>
        <Form.Control
          type='text'
          name='country'
          defaultValue={country}
          className='form-field'
          onChange={(e) => changesHandler(e)}
          required
        ></Form.Control>
      </Form.Group>
      {addressExists ? (
        <Row>
          <Col mb={2}>
            <Button
              type='button'
              className='rounded-btn'
              variant='dark'
              onClick={cancelChanges}
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
              block
            >
              <i className='fas fa-save'></i> Save
            </Button>
          </Col>
        </Row>
      ) : (
        <div className='py-4'>
          <Button className='rounded-btn' type='submit' variant='success' block>
            Continue
          </Button>
        </div>
      )}
    </Form>
  );
};

export const AdminUserUpdateForm = ({ values, functions }) => {
  const { name, email, isAdmin: admin, change, shippingAddress } = values;
  const { address, country, postalCode, city } = shippingAddress;
  const { changesHandler, submitHandler } = functions;

  return (
    <Form>
      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type='text'
          name='name'
          value={name}
          className='form-field'
          onChange={changesHandler}
        ></Form.Control>
        <div className='py-2'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={email}
            className='form-field'
            onChange={changesHandler}
          ></Form.Control>
        </div>
        <div className='py-2'>
          <Form.Check
            type='switch'
            checked={admin || false}
            variant='info'
            id='custom-switch'
            name='admin'
            label={admin ? 'Admin' : 'Not admin'}
            onChange={changesHandler}
          />
        </div>
        <div className='py-2'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            name='address'
            defaultValue={address}
            className='form-field'
            onChange={changesHandler}
            required
          ></Form.Control>
        </div>

        <div className='py-2'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            name='city'
            defaultValue={city}
            className='form-field'
            onChange={changesHandler}
            required
          ></Form.Control>
        </div>
        <div className='py-2'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='number'
            name='postalCode'
            defaultValue={postalCode}
            className='form-field'
            onChange={changesHandler}
            required
          ></Form.Control>
        </div>
        <div className='py-2'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            name='country'
            defaultValue={country}
            className='form-field'
            onChange={changesHandler}
            required
          ></Form.Control>
        </div>
      </Form.Group>
      <div className='btn-container'>
        <Button
          type='submit'
          variant='success'
          onClick={submitHandler}
          disabled={!change}
          block
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

export const ProductUpdateForm = ({ values, functions }) => {
  return (
    <Form onSubmit={functions.submitHandler}>
      <Form.Group controlId='image'>
        <Form.Label>Image</Form.Label>
        <Form.Control
          type='text'
          defaultValue={values.image}
          className='form-field'
          disabled
        ></Form.Control>
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
          onChange={functions.changesHandler}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='price'>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type='number'
          name='price'
          defaultValue={values.price}
          className='form-field'
          onChange={functions.changesHandler}
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
          onChange={functions.changesHandler}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='category'>
        <Form.Label>Category</Form.Label>
        <Form.Control
          type='text'
          name='category'
          defaultValue={values.category}
          className='form-field'
          onChange={functions.changesHandler}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='countInStock'>
        <Form.Label>In Stock</Form.Label>
        <Form.Control
          type='number'
          name='countInStock'
          defaultValue={values.countInStock}
          className='form-field'
          onChange={functions.changesHandler}
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
          onChange={functions.changesHandler}
          style={{ height: '100px' }}
        ></Form.Control>
      </Form.Group>
      <Row>
        <Col mb={2}>
          <Button
            type='button'
            className='rounded-btn'
            variant='dark'
            onClick={functions.cancelChanges}
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
  );
};
