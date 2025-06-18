import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { registerUser } from "../store/userActions";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import "./styles/Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch<any>(registerUser(name, email, password));

      navigate("/login");
    } catch (error: any) {}

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Container className="d-flex align-items-center justify-content-center auth-container">
      <Form
        onSubmit={handleRegister}
        className="auth-form d-flex flex-column justify-content-between"
      >
        <Form.Group controlId="name" className="auth-form-group">
          <Form.Label className="auth-label">Name</Form.Label>
          <Form.Control
            required
            type="text"
            value={name}
            placeholder="Enter name"
            className="auth-input"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

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
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
