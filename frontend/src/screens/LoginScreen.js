import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import Message from '../components/Message'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin)
  //since in our userReducers we have all these values
  const { loading, error, userInfo } = userLogin

  //location.search will have the url query string
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
        navigate(redirect)
    }
  }, [navigate,userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>Invalid Credentials</Message>}
      {loading && <h1>Loading..</h1>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen