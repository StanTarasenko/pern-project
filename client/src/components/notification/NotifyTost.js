// Modules
import { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import { useSelector } from 'react-redux';
import { selectNotifyData } from '../../features/userSlice';
// import { PropTypes } from 'prop-types';

// Type of variant
// 'primary'
// 'secondary'
// 'success'
// 'danger'
// 'warning'
// 'info'
// 'light'
// 'dark'

const NotifyTost = () => {
  const [show, setShow] = useState(false);
  const { text, variant } = useSelector(selectNotifyData);

  useEffect(() => {
    if (text && variant) setShow(true);
  }, [text, variant]);

  return (
    <div style={{ position: 'fixed', top: '0', left: '0' }}>
      <Toast 
        onClose={() => setShow(false)} 
        show={show} 
        delay={3000} 
        autohide 
        bg={variant}
      >
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded"
            alt=""
          />
          <small className="me-auto">Process Notification</small>
        </Toast.Header>
        <Toast.Body style={{ color: 'white' }}>
          <strong>{text}</strong>
        </Toast.Body>
      </Toast>
    </div>
  );
}

NotifyTost.propTypes = {
  // text: PropTypes.string.isRequired,
  // variant: PropTypes.string.isRequired,
}

export default NotifyTost;
