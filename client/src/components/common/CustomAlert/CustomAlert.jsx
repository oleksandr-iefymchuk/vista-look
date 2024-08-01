import './CustomAlert.scss';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CustomAlert = ({
  open,
  onClose,
  message,
  severity,
  autoHideDuration = 3000
}) => {
  return (
    <div className='custom-alert-wrap'>
      <Snackbar
        className='alert'
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
      >
        <Alert variant='filled' onClose={onClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

CustomAlert.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success', '']),
  autoHideDuration: PropTypes.number
};

export default CustomAlert;
