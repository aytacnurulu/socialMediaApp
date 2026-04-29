import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./PostEditModal.module.css";

function PostEditModal({ title, body, onClose, show = false, onUpdate }) {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);

  const handleSave = () => {
    onUpdate({
      title: editedTitle,
      body: editedBody,
    });
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton className={styles.header}>
        <Modal.Title className={styles.title}>Edit post</Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.body}>
        <input
          className={styles.input}
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />

        <textarea
          className={styles.textarea}
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
        />
      </Modal.Body>

      <Modal.Footer className={styles.footer}>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>

        <Button variant="primary" onClick={handleSave}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PostEditModal;