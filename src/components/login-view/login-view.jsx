import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './login-view.scss';


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ usernameErr, setUsernameErr] = useState ('');
  const [ passwordErr, setPasswordErr] = useState ('');

  // validation user inputs

  const validate =() => {
    let isReq = true;
    if(!username){
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.lenght < 2) {
      setUsernameErr ('Username must be 2 characters long');
      isReq = false;
    }
    if(!password){
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.lenght < 3) {
      setPasswordErr ('Password must be 6 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      /* Send a request to the server for authentication */  
    axios.post('https://myflixapp1.herokuapp.com/movies/login',
    {
      Username: username,
      Password: password
    })
      .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  }
};

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername (e.target.value)} />
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword (e.target.value)} />
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
};