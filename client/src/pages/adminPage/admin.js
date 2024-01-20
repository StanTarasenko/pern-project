// Modules
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Row } from 'react-bootstrap';

// Components
import CreateType from '../../components/modals/CreateType';
import CreateBrand from '../../components/modals/CreateBrand';
import CreateDevice from '../../components/modals/CreateDevice';
import DeviceTable from '../../components/devicesTable/DeviceTable';

// Features
import { getDevices, selectDeviceList } from '../../features/deviceSlice';
import { getTypes, selectTypeList } from '../../features/typeSlice';
import { getBrands, selectBrandList } from '../../features/brandSlice';

const Admin = () => {
  const dispatch = useDispatch();
  const [isTypeShow, setIsTypeShow] = useState(false);
  const [isBrandShow, setIsBrandShow] = useState(false);
  const [isDeviceShow, setIsDeviceShow] = useState(false);

  const devices = useSelector(selectDeviceList);
  const brands = useSelector(selectBrandList);
  const types = useSelector(selectTypeList);

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

  useEffect(() => {
    dispatch(getDevices({
      typeId: null, 
      brandId: null, 
      page: null, 
      limit: null
    }));
    dispatch(getTypes());
    dispatch(getBrands());
}, [dispatch]);

  return (
    <div style={{
      padding: "60px 40px", 
      height: "100vh", 
      display: "grid", 
      gridTemplateColumns: "15% 85%",
      marginTop: "50px"
    }}>
      <Container>
        <Row style={{ position: "fixed" }}>
          <Button variant="outline-dark" onClick={() => handlerOpenModal('type')}>
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
      <Container>
        <DeviceTable data={devices.rows ? devices.rows : []} title="device" />
        <DeviceTable data={types ? types : []} title="type" />
        <DeviceTable data={brands ? brands : []} title="brand" />
      </Container>
      <CreateType show={isTypeShow} onHide={() => setIsTypeShow(false)} />
      <CreateBrand show={isBrandShow} onHide={() => setIsBrandShow(false)} />
      <CreateDevice show={isDeviceShow} onHide={() => setIsDeviceShow(false)} />
    </div>
  );
};

export default Admin;
