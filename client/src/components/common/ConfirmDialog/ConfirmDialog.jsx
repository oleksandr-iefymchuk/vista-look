import './ConfirmDialog.scss';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';

import ButtonWrapper from '../Button/Button';

const ConfirmDialog = ({ open, onClose, onConfirm, title, content }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <ButtonWrapper
          buttonClassName='dialog-btn delete'
          onClick={onConfirm}
          buttonText='Видалити'
        />
        <ButtonWrapper
          buttonClassName='dialog-btn cancel'
          onClick={onClose}
          buttonText='Відміна'
        />
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default ConfirmDialog;
