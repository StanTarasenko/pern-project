// Modules
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// Components
import TypeBar from '../../components/TypeBar';
import BrandBar from '../../components/BrandBar';
import DeviceList from '../../components/DeviceList';

// Utils
import { SHOP_ROUTE, LIMIT_FOR_DEVICES } from '../../utils/constants';
import { 
  getDevices, 
  selectDeviceList, 
  selectDevicePage,
  setLimit,
} from '../../features/deviceSlice';
import ShopPagination from '../../components/pagination/Pagination';
import { selectBrandId } from '../../features/brandSlice';
import { selectTypeId } from '../../features/typeSlice';

const Shop = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const currentBrandId = useSelector(selectBrandId);
  const currentTypeId = useSelector(selectTypeId);
  const devices = useSelector(selectDeviceList);
  const devicePage = useSelector(selectDevicePage);

  useEffect(() => {
    if (pathname === SHOP_ROUTE) {
      dispatch(getDevices({
        typeId: currentTypeId ? currentTypeId : null, 
        brandId: currentBrandId ? currentBrandId : null, 
        page: devicePage, 
        limit: LIMIT_FOR_DEVICES
      }));
      dispatch(setLimit(LIMIT_FOR_DEVICES));
    }
  }, [dispatch, pathname, currentTypeId, currentBrandId, devicePage]);
  
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
            <DeviceList devices={ devices ? devices : [] } />
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
