// Modules
import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Utils
import { DEVICE_ROUTE } from '../utils/constants';
import { selectBrandList } from '../features/brandSlice';
import { PropTypes } from 'prop-types';

const DeviceItem = ({ device }) => {
  const navigate = useNavigate();
  const brands = useSelector(selectBrandList);

  const currentBrand = brands.find((brand) => brand.id === device.brandId);

  return (
    <Col md={3} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
      <Card style={{ 
        marginTop: "20px", 
        display: "flex",
        padding: "10px",
        cursor: "pointer" 
      }}>
        <div style={{ 
          display: "flex",
          justifyContent: "center",
          alignItems: "center" 
          }} 
        >
          <img 
            alt="img" 
            src={`http://localhost:5000/${device.img}`} 
            style={{ 
              width: "100%", 
              height: "220px"
            }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          {currentBrand && currentBrand.name}
        </div>
        <div>{device.name}</div>
        <div>{device.price}</div>
      </Card>
    </Col>
  );
};

DeviceItem.propTypes = {
  device: PropTypes.object.isRequired
}

export default DeviceItem;
