// Modules
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

// Assets
import star from '../../assets/star.svg';

// Features
import {
  getDeviceById, 
  selectDeviceById,
  selectDeviceByIdStatus,
} from '../../features/deviceSlice';

// Components
import BasketBtn from '../../components/addToBasketBtn/BasketBtn.tsx';

const DevicePage = () => {
  const dispatch = useDispatch();
  const device = useSelector(selectDeviceById);
  const deviceStatus = useSelector(selectDeviceByIdStatus);
  const { pathname } = useLocation();

  useEffect(() => {
    const currentId = pathname.slice(-1);
    dispatch(getDeviceById(Number(currentId)));
  }, [dispatch, pathname]);

  return (
    <div style={{  
        padding: "40px 20px", 
        height: "100vh"
      }}
    >
      <Container style={{ marginTop: "50px" }}>
        <Row>
          {device.img && deviceStatus === 'succeeded' 
          ? <Col md={4}>
            <img 
              alt="img" 
              src={`http://localhost:5000/${device.img}`} 
              style={{ 
                width: "300px", 
                height: "350px"
                }}
              />
            </Col> 
          : <Col md={4}>
              <Spinner animation="border" variant="info" />
            </Col>}
          <Col md={4}>
            <h2>{device.name}</h2>
            <div style={{ 
                width: "150px", 
                height: "150px",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
              <h3 style={{ position: "absolute", marginTop: "15px" }}>
                {device.rating}
              </h3>
              <img 
                alt="img" 
                src={star} 
                style={{ 
                  width: "150px", 
                  height: "150px"
                }}
              />
            </div>
            Price: {device.price}
          </Col>
          <Col md={4}>
            <h3>Device Info</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Integer vehicula vel nunc et commodo. Sed vitae sapien vulputate, 
            rhoncus nulla et, blandit est. Mauris egestas cursus diam sit amet auctor. 
            Praesent quis nibh in erat ornare congue. 
            Etiam rutrum ex non libero ullamcorper scelerisque ac eu sapien. 
            Phasellus vitae tellus luctus, dictum risus sed, tempus elit. Nam dolor erat, 
            tempor et turpis quis, convallis fringilla nisl.
            <hr/>
            {device.info && device.info.map((item) => <Col key={item.id}>
              <h5>
                {item.title}: {item.description}
              </h5>
            </Col>)}
          </Col>
        </Row>
        <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
          <BasketBtn device={device} />
        </div>
      </Container>
    </div>
  );
};

export default DevicePage;