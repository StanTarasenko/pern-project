// Modules
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Utils
import { PropTypes } from 'prop-types';
import { createBrand } from '../../http/brandApi';
import { getBrands } from '../../features/brandSlice';

const CreateBrand = ({ show, onHide}) => {
  const dispatch = useDispatch();
  const [brandName, setBrandName] = useState('');

  const createNewBrand = async () => {
    await createBrand({ name: brandName });
    setTimeout(() => { 
      dispatch(getBrands());
      onHide();
    }, 0);
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
            Add new Brand
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control 
              placeholder='Add Brand name' 
              onChange={(e) => setBrandName(e.target.value)} 
              value={brandName} 
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={() => createNewBrand()}>Add</Button>
          <Button variant="outline-danger" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

CreateBrand.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
}

export default CreateBrand;
