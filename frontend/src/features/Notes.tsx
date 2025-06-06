import { useState } from "react";
import { Container, Row, Col, Spinner, Pagination } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";
import Note from "../components/Note";

import api from "../app/api";

const fetchNotes = async (path: string, search: string) => {
  const params = new URLSearchParams();

  if (path === "/favorites") {
    params.set("favourite", "true");
  } else if (path.startsWith("/tags/")) {
    const tag = path.split("/tags/")[1];
    params.set("tag", tag);
  }

  if (search) {
    const query = new URLSearchParams(search);
    query.forEach((val, key) => {
      params.set(key, val);
    });
  }

  const queryStr = params.toString();
  const url = queryStr ? `/api/notes/search?${queryStr}` : `/api/notes/`;
  const { data } = await api.get(url);
  return data;
};

export default function Notes() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 8;

  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", location.pathname, location.search],
    queryFn: () => fetchNotes(location.pathname, location.search),
    retry: false,
  });

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading notes...</p>
      </Container>
    );
  }

  if (isError || !notes?.length) {
    return (
      <Container className="text-center mt-5">
        <p>No notes found or failed to load.</p>
      </Container>
    );
  }

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
  const totalPages = Math.ceil(notes.length / notesPerPage);

  return (
    <Container
      fluid="md"
      className="d-flex flex-column px-3"
      style={{ height: "90vh", paddingTop: "1rem", paddingBottom: "1rem" }}
    >
      <div
        style={{ flex: 1, overflowY: "auto" }}
        className="d-flex justify-content-center align-items-start"
      >
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 w-100">
          {currentNotes.map((note: any) => (
            <Col key={note._id} className="d-flex justify-content-center">
              <Note note={note} />
            </Col>
          ))}
        </Row>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-3">
          <Pagination className="mb-0 flex-wrap">
            <Pagination.First
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </Container>
  );
}
