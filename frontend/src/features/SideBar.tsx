import type { JSX } from "react";
import { useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router";
import Search from "../features/Search";

import "./styles/SideBar.css";

const SideBar = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`sidebar d-flex flex-column ${isOpen ? "open p-3" : "closed"}`}
    >
      <button
        className="sidebar-toggle d-flex justofy-content-center align-items-center"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? "❮" : "❯"}
      </button>

      {isOpen && (
        <>
          <Search />
          <hr className="my-3" />

          <h6>Favorites</h6>
          <Nav className="flex-column mb-3">
            <Nav.Link as={NavLink} to="/favorites">
              All Favorites
            </Nav.Link>
          </Nav>

          <h6>Tags</h6>
          <Nav className="flex-column">
            <Nav.Link as={NavLink} to="/tags/work">
              Work
            </Nav.Link>
            <Nav.Link as={NavLink} to="/tags/personal">
              Personal
            </Nav.Link>
            <Nav.Link as={NavLink} to="/tags/ideas">
              Ideas
            </Nav.Link>
          </Nav>
        </>
      )}
    </aside>
  );
};

export default SideBar;
