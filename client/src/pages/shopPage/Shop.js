// Modules
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// Components
import TypeBar from '../../components/TypeBar';
import BrandBar from '../../components/BrandBar';
import DeviceList from '../../components/DeviceList';

// Utils
import { SHOP_ROUTE } from '../../utils/constants';
import { setStatusById } from '../../features/deviceSlice';
import ShopPagination from '../../components/pagination/Pagination';

const Shop = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === SHOP_ROUTE) {
      dispatch(setStatusById('idle'));
    }
  }, [dispatch, pathname]);
  
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
            <DeviceList />
            <Row style={{ marginTop: "40px" }}>
              <ShopPagination />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Shop;
