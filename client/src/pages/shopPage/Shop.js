// Modules
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Components
import TypeBar from '../../components/TypeBar';
import BrandBar from '../../components/BrandBar';
import DeviceList from '../../components/DeviceList';

const Shop = () => {
  return (
    <div style={{
        padding: "40px 20px", 
        height: "100vh"
      }}
    >
      <Container>
        <Row style={{ marginTop: "40px" }}>
          <Col md={3}>
            <TypeBar />
          </Col>
          <Col md={9}>
            <Row>
              <BrandBar />
            </Row>
            <DeviceList/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Shop;
