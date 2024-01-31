// Modules
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

import { PropTypes } from 'prop-types';
import { 
  createType, 
  getTypes, 
  selectCreateTypeError, 
  selectCreateTypeStatus, 
  selectTypeList 
} from '../../features/typeSlice';

// Helpers
import isExcist from '../../helpers/isExcist';
import { setNotifyData } from '../../features/userSlice';

const CreateType = ({ show, onHide }) => {
  const dispatch = useDispatch(); 
  const [typeName, setTypeName] = useState('');

  const createStatus = useSelector(selectCreateTypeStatus);
  const createError = useSelector(selectCreateTypeError);
  const types = useSelector(selectTypeList);

  const createNewType = async () => {
      if (!typeName) return;
      const check = isExcist(types, typeName);
      if (check) {
        dispatch(setNotifyData({text: 'This type already exsit', variant: 'warning'}))
      } else {
        await dispatch(createType({ name: typeName }));
        dispatch(setNotifyData({text: 'Type has been added', variant: 'success'}))
      }
      setTimeout(() => { 
      dispatch(getTypes());
      onHide();
    }, 0);
  };

  useEffect(() => {
    if (createStatus === 'failed') {
      dispatch(setNotifyData({text: createError, variant: 'danger'}))
    }
  }, [createStatus, createError]);

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
