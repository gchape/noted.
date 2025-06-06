import { Card } from "react-bootstrap";

import "./styles/Note.css";

const Note = ({ note }: { note: Note }) => {
  return (
    <Card className="note-card mb-3">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="note-title">
          {note.title} {note.favourite && <span className="star">⭐</span>}
        </Card.Title>

        {note.url && (
          <div className="note-url mb-2">
            <a href={note.url} target="_blank" rel="noopener noreferrer">
              {note.url}
            </a>
          </div>
        )}

        <Card.Text className="note-content">
          {note?.content?.length! < 150
            ? note.content
            : `${note?.content?.slice(0, 150)}...`}
        </Card.Text>

        <div className="note-tags">
          {note.tags.map((tag) => (
            <span key={tag} className="badge bg-secondary">
              {tag}
            </span>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Note;
