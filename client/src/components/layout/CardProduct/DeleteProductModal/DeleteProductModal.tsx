import css from './DeleteProductModal.module.scss';
import { ButtonWrapper } from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal/Modal';
import { FormattedMessage, useIntl } from 'react-intl';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const DeleteProductModal = ({ isOpen, onClose, onConfirm }: Props) => {
  const intl = useIntl();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={css.modal}>
      <p className={css.title}>
        <FormattedMessage id='deleteProductModal.title' defaultMessage='Підтвердження видалення товару' />
      </p>
      <p className={css.description}>
        <FormattedMessage id='deleteProductModal.description' defaultMessage='Ви впевнені, що бажаєте видалити цей товар?' />
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
