import type { JSX } from "react";
import { Link, NavLink } from "react-router";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

import "./styles/NavBar.css";
import logo from "../assets/logo.png";

type NavBarProps = {
  expand: "sm" | "md" | "lg";
};

const NavBar = ({ expand }: NavBarProps): JSX.Element => {
  return (
    <Navbar expand="lg">
      <Container
        fluid
        className="d-flex w-100 h-100 align-items-center justify-content-between"
      >
        <Navbar.Brand
          as={Link}
          to="/"
          aria-label="Homepage"
          className="m-0 p-0 d-flex align-items-center"
        >
          <img src={logo} className="logo me-2" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/login">
                Log In
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register">
                Register
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
