import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container"
import logo from '../logo.svg';
import jwt_decode from "jwt-decode";


function Login() {
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");

  // const handleChange = ({ currentTarget: input }) => {
  // 	setData({ ...data, [input.name]: input.value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInfo = {
      email: email,
      password: password,
    };

    try {
      const url = "http://localhost:3001/api/auth/";
      const response = await axios.post(url, userInfo);
      const token = response.data.data;
      console.log(response.data);

      const decodedToken = jwt_decode(token);
      // const isAdmin = JSON.parse(decodedToken.isAdmin);

      localStorage.setItem("token", token);
      // localStorage.setItem("isAdmin", isAdmin);

      // console.log(localStorage.token);
      // console.log(decodedToken.email);
      // console.log(decodedToken.firstName);
      // console.log(decodedToken.lastName);
      // console.log(decodedToken._id);

      window.location = "/Home";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <Container className="form_container">
      <div className='Form_center'>
        <div className='login_form_container'>
          <div className='left'>
            <form className='form_container' onSubmit={handleSubmit}>
              <Row>
                <div className='w-100'>
                  <div className='align-items-center w-100 text-center'>
                    <img id='mainLogo' src={logo} alt='Interro Logo' />
                  </div>
                </div>
              </Row>

              <Row>
                <Col><p className='mt-2'>Login to Your Account</p></Col>
              </Row>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className='input' />
                <p className='post-descriptor'>Enter Email</p>
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className='input' />
                <p className='post-descriptor'>Enter Password</p>
              </Form.Group>

              {error && <div className='error_msg'>{error}</div>}
              <button type="submit" className='btn btn-primary'>
                Sign In
              </button>
            </form>
          </div>
          <div className='right'>
            <h1>New Here ?</h1>
            <Link to="/signup">
              <button type="button" className='btn btn-primary'>
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Login;