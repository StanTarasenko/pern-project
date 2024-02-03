// Modules
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';

// Features
import { selectUser } from '../../features/userSlice';

const BasketBtn = ({ device }) => {
  const user = useSelector(selectUser);
 
  const handlerAddDevice = () => {
    // Add check if device already in basket
    console.log(user)
    console.table(device.id, device.name);
  };

  return (
    <Button variant="outline-primary" onClick={() => handlerAddDevice()}>
      Add to Basket
    </Button>
  )
}

BasketBtn.propTypes = {
  device: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }).isRequired,
};

export default BasketBtn;
