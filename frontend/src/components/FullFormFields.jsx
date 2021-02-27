import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from './FormContainer';

const FullFormFields = ({ values, passwords, functions }) => {
  const { name, email } = values;
  const { pass1, pass2 } = passwords;
  const { setName, setEmail, setPass1, setPass2 } = functions;

  return (
    <>
      <Form.Group controlId='name' className='py-1'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          value={name}
          className='form-field'
          onChange={(e) => setName(e)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='email' className='py-1'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          value={email}
          className='form-field'
          onChange={(e) => setEmail(e)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='password1' className='py-1'>
        <Form.Label>{pass1}</Form.Label>
        <Form.Control
          type='password'
          className='form-field'
          onChange={(e) => setPass1(e)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='password2' className='py-1'>
        <Form.Label>{pass2}</Form.Label>
        <Form.Control
          type='password'
          className='form-field'
          onChange={(e) => setPass2(e)}
        ></Form.Control>
      </Form.Group>
    </>
  );
};

export default FullFormFields;
