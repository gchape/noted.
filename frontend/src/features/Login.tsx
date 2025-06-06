import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../store/hooks";
import { loginUser } from "../store/userActions";

import "./styles/Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(email, password));
      
      navigate("/");
    } catch (error: any) {}
  };

  return (
    <Container className="d-flex align-items-center justify-content-center auth-container">
      <Form onSubmit={handleLogin} className="auth-form d-flex flex-column">
        <Form.Group controlId="email" className="auth-form-group">
          <Form.Label className="auth-label">Email</Form.Label>
          <Form.Control
            required
            type="email"
            value={email}
            placeholder="Enter email"
            className="auth-input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password" className="auth-form-group">
          <Form.Label className="auth-label">Password</Form.Label>
          <Form.Control
            required
            type="password"
            value={password}
            placeholder="Enter password"
            className="auth-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="warning" type="submit" className="auth-button">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
