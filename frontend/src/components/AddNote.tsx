import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import type { JSX } from "react";
import { useNavigate } from "react-router";

import "../features/styles/Auth.css";

const AddNote = (): JSX.Element => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [favourite, setFavourite] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    await axios.post(`${import.meta.env.VITE_API_URL}/api/notes`, {
      title,
      url,
      content,
      tags: tagList,
      favourite,
    });

    navigate("/");
  };

  return (
    <Container className="d-flex align-items-center justify-content-center auth-container">
      <Form
        onSubmit={handleSubmit}
        className="auth-form d-flex flex-column justify-content-between"
      >
        <Form.Group controlId="title" className="auth-form-group">
          <Form.Label className="auth-label">Title</Form.Label>
          <Form.Control
            required
            type="text"
            value={title}
            placeholder="Enter title"
            className="auth-input"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="url" className="auth-form-group">
          <Form.Label className="auth-label">URL (optional)</Form.Label>
          <Form.Control
            type="url"
            value={url}
            placeholder="Enter URL"
            className="auth-input"
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="content" className="auth-form-group">
          <Form.Label className="auth-label">Content (optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={content}
            placeholder="Enter content"
            className="auth-input"
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="tags" className="auth-form-group">
          <Form.Label className="auth-label">Tags (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            value={tags}
            placeholder="e.g. react, notes, coding"
            className="auth-input"
            onChange={(e) => setTags(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="favourite" className="auth-form-group">
          <Form.Check
            type="checkbox"
            label="Mark as favourite"
            checked={favourite}
            className="auth-label"
            onChange={(e) => setFavourite(e.target.checked)}
          />
        </Form.Group>

        <Button variant="warning" type="submit" className="auth-button">
          Add Note
        </Button>
      </Form>
    </Container>
  );
};

export default AddNote;
