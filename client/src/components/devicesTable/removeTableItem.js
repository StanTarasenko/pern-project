// Modules
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import ConfirmModal from '../modals/ConfirmModal';
import { PropTypes } from 'prop-types';
import { deleteBrand, getBrands } from '../../features/brandSlice';
import { deleteType, getTypes } from '../../features/typeSlice';
import { deleteDeviceById, getDevices } from '../../features/deviceSlice';
import { setNotifyData } from '../../features/userSlice';

const RemoveTableItem = ({ id, title }) => {
  const dispatch = useDispatch();
  const [isConfirm, setIsConfirm] = useState(false);

  const handlerRemove = async () => {
    if (!title) return;
    if (title === 'brand') {
      try {
        await dispatch(deleteBrand(id));
        setTimeout(() => { 
          dispatch(getBrands())
        }, 0);
      } catch (error) {
        console.error('Error deleting data:', error.message);
      }
    }
    if (title === 'type') {
      try {
        await dispatch(deleteType(id));
        setTimeout(() => { 
          dispatch(getTypes())
        }, 0);
      } catch (error) {
        console.error('Error deleting data:', error.message);
      }
    }
    if (title === 'device') {
      try {
        await dispatch(deleteDeviceById(id));
        setTimeout(() => { 
          dispatch(getDevices({
            typeId: null, 
            brandId: null, 
            page: null, 
            limit: null
          }));
        }, 0);
      } catch (error) {
        console.error('Error deleting data:', error.message);
      }
    }
  };

  useEffect(() => {
    if (isConfirm) {
      handlerRemove();
      dispatch(setNotifyData({text: 'Item has been deleted', variant: 'success'}))
      setIsConfirm(false);
    }
  }, [isConfirm]);

  return (
    <>
      <ConfirmModal setIsConfirm={setIsConfirm} title={title} />
    </>
  );
};

RemoveTableItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default RemoveTableItem;
