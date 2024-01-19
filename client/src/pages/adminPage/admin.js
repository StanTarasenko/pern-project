// Modules
import React, { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import CreateType from '../../components/modals/CreateType';
import CreateBrand from '../../components/modals/CreateBrand';
import CreateDevice from '../../components/modals/CreateDevice';

const Admin = () => {
  const [isTypeShow, setIsTypeShow] = useState(false);
  const [isBrandShow, setIsBrandShow] = useState(false);
  const [isDeviceShow, setIsDeviceShow] = useState(false);

  const handlerOpenModal = (modalName) => {
    if (modalName === 'type') {
      setIsTypeShow(true);
    }
    if (modalName === 'brand') {
      setIsBrandShow(true);
    }
    if (modalName === 'device') {
      setIsDeviceShow(true);
    }
  };

  return (
    <div style={{
      padding: "40px 20px", 
      height: "100vh", 
      display: "flex", 
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center" 
    }}>
      <Container>
        <Row>
          <Button className="mt-2" variant="outline-dark" onClick={() => handlerOpenModal('type')}>
            Add type
          </Button>
          <Button className="mt-2" variant="outline-dark" onClick={() => handlerOpenModal('brand')}>
            Add brand
          </Button>
          <Button className="mt-2" variant="outline-dark" onClick={() => handlerOpenModal('device')}>
            Add device
          </Button>
        </Row>
      </Container>
      <CreateType show={isTypeShow} onHide={() => setIsTypeShow(false)} />
      <CreateBrand show={isBrandShow} onHide={() => setIsBrandShow(false)} />
      <CreateDevice show={isDeviceShow} onHide={() => setIsDeviceShow(false)} />
    </div>
  );
};

export default Admin;
