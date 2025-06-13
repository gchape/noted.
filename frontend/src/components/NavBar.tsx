import { type JSX } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router";
import type { AppDispatch, RootState } from "../store/store";

import "./styles/NavBar.css";
import logo from "../assets/logo.png";
import { logoutUser } from "../store/userActions";

type NavBarProps = {
  expand: "sm" | "md" | "lg";
};

const NavBar = ({ expand }: NavBarProps): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    await dispatch(logoutUser());

    location.reload();
  };

  return (
    <Navbar expand="lg">
      <Container
        fluid
        className="d-flex w-100 h-100 align-items-center justify-content-between"
      >
        <Navbar.Brand
          as={Link}
          to="/"
          className="m-0 p-0 d-flex align-items-center"
        >
          <img src={logo} className="logo me-2" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>

              {!user ? (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    Log In
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/register">
                    Register
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/add">
                    Add Note
                  </Nav.Link>
                  <Nav.Link as={Link} to="/" onClick={handleLogout}>
                    Log Out
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
