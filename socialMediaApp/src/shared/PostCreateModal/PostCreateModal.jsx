import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../PostEditModal/PostEditModal.module.css";

function PostCreateModal({ onClose, show = false, onCreate }) {
  const [createTitle, setCreateTitle] = useState("");
  const [createBody, setCreateBody] = useState("");

  const handleSave = () => {
    if (!createTitle.trim() || !createBody.trim()) return;

    onCreate({
      title: createTitle,
      body: createBody,
    });

    setCreateTitle("");
    setCreateBody("");
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton className={styles.header}>
        <Modal.Title className={styles.title}>Create post</Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.body}>
        <input
          className={styles.input}
          type="text"
          placeholder="Post title"
          value={createTitle}
          onChange={(e) => setCreateTitle(e.target.value)}
        />

        <textarea
          className={styles.textarea}
          placeholder="Post body"
          value={createBody}
          onChange={(e) => setCreateBody(e.target.value)}
        />
      </Modal.Body>

      <Modal.Footer className={styles.footer}>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>

        <Button variant="primary" onClick={handleSave}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PostCreateModal;