import { Link, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
// internal components
import { Auth, FormContainer, Message, Spinner } from '../../components'
// redux actions
import { login } from '../../actions/userActions'
const initialValues = { email: '', password: '' }

const formFields = [
  { name: 'email', type: 'email', label: 'Email Address' },
  { name: 'password', type: 'password', label: 'Password' },
]

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(32, 'Too Long!')
    .required('Please enter your password'),
})

const LoginScreen = ({ history }) => {
  // redux stuff
  const dispatch = useDispatch()
  const { loading, error: loginError } = useSelector((state) => state.userLogin)

  // variables
  const redirect =
    new URLSearchParams(useLocation().search).get('redirect') || '/'

  const handleSubmit = (vals, onSubmitProps) => {
    onSubmitProps.resetForm()
    onSubmitProps.setSubmitting(false)
    dispatch(login(vals.email, vals.password))
  }

  const isInvalid = (f, p) => f.touched[p] && f.errors[p]

  return (
    <Auth history={history} reverse>
      <FormContainer>
        <h1>Sign in</h1>
        <Spinner hidden={!loading} />
        <Message variant='danger'>{loginError}</Message>
        <div className='py-4'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <FormikForm>
              {formFields.map((f, i) => (
                <Form.Group key={i} controlId={f.name}>
                  <Field name={f.name}>
                    {({ field, form }) => (
                      <>
                        <Form.Label>{f.label}</Form.Label>
                        <Form.Control
                          type={f.type}
                          isInvalid={isInvalid(form, f.name)}
                          {...field}
                        ></Form.Control>
                      </>
                    )}
                  </Field>
                  <ErrorMessage name={f.name}>
                    {(msg) => (
                      <Form.Control.Feedback type='invalid'>
                        {msg}
                      </Form.Control.Feedback>
                    )}
                  </ErrorMessage>
                </Form.Group>
              ))}
              <Button type='submit' className='btn-block' variant='info'>
                Sign in
              </Button>
              <Row className='py-3'>
                <Col className='text-center'>
                  New Customer?{' '}
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : '/register'
                    }
                  >
                    <span className='link'>Register</span>
                  </Link>
                </Col>
              </Row>
            </FormikForm>
          </Formik>
        </div>
      </FormContainer>
    </Auth>
  )
}

export default LoginScreen
