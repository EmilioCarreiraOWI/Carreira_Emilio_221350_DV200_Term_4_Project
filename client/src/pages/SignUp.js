import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/esm/Col";
import logo from '../logo.svg';
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";


function SignUp() {

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3001/api/registerUser";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      navigate("/Login");
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
        <div className='signup_form_container'>
          <div className='left dark-grey'>
            <Row>
              <div className='w-100'>
                <div className='align-items-center w-100 text-center'>
                  <img id='mainLogo' src={logo} alt='Interro Logo' />
                </div>
              </div>
            </Row>
            <h1>Welcome Back</h1>
            <Link to="/Login">
              <button type="button" className='btn btn-primary'>
                Sign in
              </button>
            </Link>
          </div>
          <div className='right'>
            <form onSubmit={handleSubmit}>
              <h2>Create Account</h2>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                  required
                  className='input' />
                <p className='post-descriptor'>Enter First name</p>
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                  required
                  className='input' />
                <p className='post-descriptor'>Enter Last Name</p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                  className='input' />
                <p className='post-descriptor'>Enter Email</p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                  className='input' />
                <p className='post-descriptor'>Enter Password</p>
              </Form.Group>

              {error && <div className='error_msg'>{error}</div>}
              <button type="submit" className='btn btn-primary'>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SignUp;