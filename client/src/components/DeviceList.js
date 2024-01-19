// Modules
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';

// Features
import { 
  getDevices, 
  selectDeviceList,
  selectDevicePage,
  setLimit, 
  setTotalCount 
} from '../features/deviceSlice';
import DeviceItem from './DeviceItem';
import { selectBrandId } from '../features/brandSlice';
import { selectTypeId } from '../features/typeSlice';

const DeviceList = () => {
  const dispatch = useDispatch();
  const currentBrandId = useSelector(selectBrandId);
  const currentTypeId = useSelector(selectTypeId);
  const devices = useSelector(selectDeviceList);
  const devicePage = useSelector(selectDevicePage);

  const [currentDevices, setCurrentDevices] = useState([]);

  useEffect(() => {
      dispatch(getDevices({
        typeId: currentTypeId ? currentTypeId : null, 
        brandId: currentBrandId ? currentBrandId : null, 
        page: devicePage, 
        limit: 4
      }));
      dispatch(setLimit(4));
  }, [dispatch, currentTypeId, currentBrandId, devicePage]);

  useEffect(() => {
    setCurrentDevices(devices.rows);
    dispatch(setTotalCount(devices.count));
  }, [dispatch, devices]);

  return (
    <Row>
      {currentDevices && currentDevices.length > 0 
        ? currentDevices.map((device) => <DeviceItem key={device.id} device={device ? device : {}} />)
        : <div>No items found</div>
      }  
    </Row>
  );
};

export default DeviceList;
