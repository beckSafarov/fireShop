import React from 'react'
import { Form } from 'react-bootstrap'

const CustomFormikField = ({ formField: f, formik, ...rest }) => {
  const isInvalid = (f, p) => f.touched[p] && f.errors[p]
  return (
    <>
      <Form.Group controlId={f.name}>
        <Form.Label>{f.label}</Form.Label>
        <Form.Control
          type={f.type}
          name={f.name}
          value={formik.values[f.name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={isInvalid(formik, f.name)}
          {...rest}
        />
        <Form.Control.Feedback type='invalid'>
          {isInvalid(formik, f.name) ? formik.errors[f.name] : ''}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  )
}

export default CustomFormikField
