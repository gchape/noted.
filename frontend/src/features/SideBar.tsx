import { useState, type JSX } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router";
import Search from "../features/Search";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useQuery } from "@tanstack/react-query";
import api from "../app/api";
import "./styles/SideBar.css";

const fetchTags = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>("/api/notes/tags");
  return data;
};

const SideBar = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const user = useSelector((state: RootState) => state.user.user);

  const { data: tags = [], isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    enabled: !!user,
  });

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

          {user && (
            <h6 className="sidebar-greeting">
              Hi, <span className="sidebar-username">{user.name}</span>
            </h6>
          )}

          <h6>Favorites</h6>
          <Nav className="flex-column mb-3">
            <Nav.Link as={NavLink} to="/favorites">
              All Favorites
            </Nav.Link>
          </Nav>

          <h6>Tags</h6>
          <Nav className="flex-column">
            {isLoading ? (
              <div className="text-muted">Loading tags...</div>
            ) : tags.length === 0 ? (
              <div className="text-muted">No tags found</div>
            ) : (
              tags.map((tag) => (
                <Nav.Link as={NavLink} to={`/tags/${tag}`} key={tag}>
                  {tag}
                </Nav.Link>
              ))
            )}
          </Nav>
        </>
      )}
    </aside>
  );
};

export default SideBar;
