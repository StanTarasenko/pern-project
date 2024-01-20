// Models
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { PropTypes } from 'prop-types';

const ConfirmModal = ({ setIsConfirm, title }) => {
  const [show, setShow] = useState(false);

  const handlerConfirm = () => setIsConfirm(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Conformation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this {title}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handlerConfirm}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ConfirmModal.propTypes = {
  setIsConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default ConfirmModal;
