import { useState, type JSX } from "react";
import { Button, Form } from "react-bootstrap";

const Search = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");

  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        value={search}
        className="me-2"
        aria-label="Search"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button variant="outline-warning">Search</Button>
    </Form>
  );
};

export default Search;
