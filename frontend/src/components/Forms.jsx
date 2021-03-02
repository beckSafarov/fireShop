import React from 'react';
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
      <Button type='button' variant='info' onClick={(e) => onClick(e)} block>
        Edit
      </Button>
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
      <Form.Group controlId='email'>
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type='text'
          value={name}
          className='form-field'
          onChange={(e) => setName(e.target.value)}
        ></Form.Control>
        <Form.Label>Email Address</Form.Label>
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
            className='btn-block'
            variant='dark'
            rounded='true'
            onClick={(e) => cancelChanges(e)}
          >
            Cancel
          </Button>
        </Col>
        <Col mb={2}>
          <Button
            type='submit'
            className='btn-block'
            variant='success'
            rounded='true'
          >
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
