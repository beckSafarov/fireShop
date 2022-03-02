import React from 'react'
import { Form, FormContainer, Button } from 'react-bootstrap'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(32, 'Too Long!')
    .required('Please enter your password'),
})

const initialValues = { email: '', password: '' }

const MyForm = () => {
  const submitHandler = (e) => {
    console.log(e)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      <FormikForm>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Field name='email'>
            {({ field }) => (
              <>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  {...field}
                />
              </>
            )}
          </Field>
          <ErrorMessage name='email' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Field name='password'>
            {({ field }) => (
              <>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  {...field}
                />
              </>
            )}
          </Field>
          <ErrorMessage name='password' />
        </Form.Group>
        {/* <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Check me out' />
        </Form.Group> */}
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </FormikForm>
    </Formik>
  )
}

export default MyForm
