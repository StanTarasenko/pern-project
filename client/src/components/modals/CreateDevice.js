// Modules
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import { PropTypes } from 'prop-types';

// Features
import { getBrands, selectBrandList } from '../../features/brandSlice';
import { getDevices } from '../../features/deviceSlice';
import { getTypes, selectTypeList } from '../../features/typeSlice';
import { createDevice } from '../../http/deviceApi';

// Components
import NotifyTost from '../notification/NotifyTost';

const CreateDevice = ({ show, onHide}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brandId, setBrandId] = useState('');
  const [typeId, setTypeId] = useState('');
  const [info, setInfo] = useState([]);
  const [file, setFile] = useState(null);

  const [isNotify, setIsNotify] = useState(false);
  const [currentVariant, setCurrentVariant] = useState('');
  const [notifyText, setNotifyText] = useState('');

  const brands = useSelector(selectBrandList);
  const types = useSelector(selectTypeList);

  useEffect(() => {
    if (show) {
      dispatch(getTypes());
      dispatch(getBrands());
    }
  }, [show, dispatch]);

  const addInfo = () => {
    setInfo([...info, {
      title: '',
      description: '',
      number: Date.now()
    }])
  };

  const handlerDeleteInfo = (id) => {
    const filteredInfo = info.filter((item) => item.number !== id);
    setInfo(filteredInfo);
  };

  const handlerChangeInfo = (key, value, number) => {
    const newInfoArr = info.map((item) => {
      if (item.number === number) {
        return {...item, [key] : value}
      } else {
        return item;
      }
    })
    setInfo(newInfoArr);
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handlerSubmit = () => {
    const formData = new FormData();

    if (!name) {
      setCurrentVariant('danger');
      setNotifyText('Device name is required');
      setIsNotify(true);
      return;
    }

    if (!price) {
      setCurrentVariant('danger');
      setNotifyText('Device price is required');
      setIsNotify(true);
      return;
    }

    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', brandId)
    formData.append('typeId', typeId)
    formData.append('info', JSON.stringify(info))

    createDevice(formData).then(() => {
      setCurrentVariant('success');
      setNotifyText('New device added to list');
      setIsNotify(true);
      setTimeout(() => {
        dispatch(getDevices({
          typeId: null, 
          brandId: null, 
          page: null, 
          limit: null
        }));
        onHide();
      }, 3000);
    });
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
            Add new device
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control 
              placeholder='Add Device name' 
              className="mb-3" 
              name="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Control 
              placeholder='Add Device price' 
              className="mb-3" 
              name="price" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)}
              type="number"
            />
            <h6>Choose Brand</h6>
            <Form.Select 
              aria-label="Brand select" 
              className="mb-3" 
              name="brandId" 
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
            >
              <option>Add device Brand</option>
              {brands && brands.map((brand) => <option value={brand.id} key={brand.id}>
                {brand.name}
                </option>
              )}
            </Form.Select>
            <h6>Choose Type</h6>
            <Form.Select 
              aria-label="Brand select" 
              className="mb-3" 
              name="typeId" 
              value={typeId}
              onChange={(e) => setTypeId(e.target.value)}
            >
              <option>Add device Type</option>
              {types && types.map((type) => <option value={type.id} key={type.id}>
                {type.name}
                </option>
              )}
            </Form.Select>
            <h6>Add image</h6>
            <Form.Control 
              placeholder='Add Device image' 
              className="mb-3" 
              type="file" 
              name="img"
              onChange={selectFile}
            />
            <Button variant="outline-primary" type="button" onClick={() => addInfo()} className="mb-3 mt-2">
              Add info
            </Button>
            {info && info.map((i) => <Row key={i.number} className="mb-4">
                <Col md={4}>
                  <Form.Control 
                    placeholder="Add title" 
                    onChange={(e) => handlerChangeInfo('title', e.target.value, i.number)} 
                    value={i.title}
                  />
                </Col>
                <Col md={4}>
                  <Form.Control 
                    placeholder="Add description" 
                    onChange={(e) => handlerChangeInfo('description', e.target.value, i.number)}
                    value={i.description}
                  />
                </Col>
                <Col md={4}>
                  <Button variant="outline-danger" onClick={() => handlerDeleteInfo(i.number)}>
                    Delete
                  </Button>
                </Col>
              </Row>
            )}
            <Modal.Footer>
              <Button variant="outline-success" onClick={() => handlerSubmit()}>
                Add
              </Button>
              <Button variant="outline-danger" onClick={onHide}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
        <NotifyTost 
          show={isNotify} 
          setShow={setIsNotify}
          text={notifyText}
          variant={currentVariant} 
        />
      </Modal>
    </div>
  );
};

CreateDevice.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
}

export default CreateDevice;
