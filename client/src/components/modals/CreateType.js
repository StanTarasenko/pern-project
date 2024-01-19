// Modules
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { PropTypes } from 'prop-types';
import { Form } from 'react-bootstrap';
import { createType } from '../../http/typeApi';

const CreateType = ({ show, onHide }) => {
  const [typeName, setTypeName] = useState('');

  const createNewType = async () => {
    await createType({ name: typeName });
  };

  return (
    <div>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control 
              placeholder='Add Type name' 
              onChange={(e) => setTypeName(e.target.value)} 
              value={typeName} 
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={() => createNewType()}>Add</Button>
          <Button variant="outline-danger" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

CreateType.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
}

export default CreateType;
