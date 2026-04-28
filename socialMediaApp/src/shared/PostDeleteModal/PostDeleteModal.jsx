import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PostDeleteModal({onClose, onDelete, show = false }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Post</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete this post?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>

        <Button variant="primary" onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default PostDeleteModal;