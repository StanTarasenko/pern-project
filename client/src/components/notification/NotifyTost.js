// Modules
import Toast from 'react-bootstrap/Toast';
import { PropTypes } from 'prop-types';

// Type of variant
// 'primary'
// 'secondary'
// 'success'
// 'danger'
// 'warning'
// 'info'
// 'light'
// 'dark'

const NotifyTost = ({ show, setShow, text, variant }) => {
  return (
    <div style={{ position: 'absolute', top: '0', right: '0' }}>
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
          <small className="me-auto">Update Notification</small>
        </Toast.Header>
        <Toast.Body style={{ color: 'white' }}>
          <strong>{text}</strong>
        </Toast.Body>
      </Toast>
    </div>
  );
}

NotifyTost.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
}

export default NotifyTost;
