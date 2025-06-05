import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";

import "./styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        email,
        password,
      })
      .then((success) => {
        setSuccess(success?.data?.message);
        setTimeout(() => navigate("/"), 1500);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message;
          setError(message);
        }
      });
  };

  return (
    <>
      {error && (
        <Alert
          variant="danger"
          className="auth-alert position-absolute w-100 text-center rounded-0"
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          variant="success"
          className="auth-alert position-absolute w-100 text-center rounded-0"
        >
          {success}
        </Alert>
      )}

      <Container className="d-flex align-items-center justify-content-center auth-container">
        <Form
          onSubmit={handleLogin}
          className="auth-form d-flex flex-column justify-content-between"
        >
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
    </>
  );
};

export default Login;
