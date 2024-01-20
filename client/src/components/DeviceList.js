// Modules
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'react-bootstrap';

// Features
import { setTotalCount } from '../features/deviceSlice';
import DeviceItem from './DeviceItem';
import { PropTypes } from 'prop-types';

const DeviceList = ({ devices }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTotalCount(devices.count));
  }, [dispatch, devices]);

  return (
    <Row>
      {devices.rows 
        ? devices.rows.map((device) => <DeviceItem key={device.id} device={device ? device : {}} />)
        : <div>No items found</div>
      }  
    </Row>
  );
};

DeviceList.propTypes = {
  devices: PropTypes.object.isRequired,
};

export default DeviceList;
