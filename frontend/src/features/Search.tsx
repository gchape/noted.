import { useState, type JSX } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";

const Search = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = search.trim();
    if (trimmed) {
      navigate(`/search?query=${encodeURIComponent(trimmed)}`);

      setSearch("");
    }
  };
  return (
    <Form className="d-flex" onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        value={search}
        className="me-2"
        aria-label="Search"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button type="submit" variant="outline-warning">
        Search
      </Button>
    </Form>
  );
};

export default Search;
