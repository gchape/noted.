import type { JSX } from "react";
import { useState } from "react";
import { Nav } from "react-bootstrap";
import Search from "../features/Search";

import "./styles/SideBar.css";

const SideBar = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`sidebar d-flex flex-column p-3 ${isOpen ? "open" : "closed"}`}
    >
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? "❮" : "❯"}
      </button>

      {isOpen && (
        <>
          <Search />
          <hr className="my-3" />

          <h6 className="text-muted">Favorites</h6>
          <Nav className="flex-column mb-3">
            <Nav.Link href="/favorites">All Favorites</Nav.Link>
          </Nav>

          <h6 className="text-muted">Tags</h6>
          <Nav className="flex-column">
            <Nav.Link href="/tags/work">Work</Nav.Link>
            <Nav.Link href="/tags/personal">Personal</Nav.Link>
            <Nav.Link href="/tags/ideas">Ideas</Nav.Link>
          </Nav>
        </>
      )}
    </aside>
  );
};

export default SideBar;
