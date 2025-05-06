import css from './DeleteReviewModal.module.scss';
import { ButtonWrapper } from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal/Modal';
import { FormattedMessage, useIntl } from 'react-intl';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const DeleteReviewModal = ({ isOpen, onClose, onConfirm }: Props) => {
  const intl = useIntl();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={css.modal}>
      <p className={css.title}>
        <FormattedMessage id='deleteReviewModal.title' defaultMessage='Підтвердження видалення відгуку' />
      </p>
      <p className={css.description}>
        <FormattedMessage id='deleteReviewModal.description' defaultMessage='Ви дійсно бажаєте видалити цей відгук?' />
      </p>
      <div className={css.buttonBlock}>
        <ButtonWrapper
          buttonClassName={css.cancel}
          onClick={onClose}
          buttonText={intl.formatMessage({ id: 'button.cancel', defaultMessage: 'Скасувати' })}
        />
        <ButtonWrapper
          buttonClassName={css.delete}
          onClick={onConfirm}
          buttonText={intl.formatMessage({ id: 'button.delete', defaultMessage: 'Видалити' })}
        />
      </div>
    </Modal>
  );
};
