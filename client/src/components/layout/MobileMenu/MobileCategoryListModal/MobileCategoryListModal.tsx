import css from './MobileCategoryListModal.module.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { Modal } from '@/components/common/Modal/Modal';
import { ButtonWrapper } from '@/components/common/Button/Button';
import { closeMobileMenu, selectCategory, selectSubcategory } from '@/store/appReduser/actionCreators';
import { SvgIcon } from '@/components/common/SvgIcon';

type Categories = {
  defaultMessage: string;
  linkName: string;
  id: string;
};

type Props = {
  categories: Array<Categories>;
  isOpen: boolean;
  onClose: () => void;
};

export const MobileCategoryListModal = ({ categories, isOpen, onClose }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = async ({ defaultMessage, linkName }: Categories) => {
    dispatch(selectCategory(defaultMessage));
    dispatch(selectSubcategory(null));
    dispatch(closeMobileMenu());
    onClose();
    navigate(`/catalog/${linkName}`);
  };

  return (
    <Modal className={css.modal} isOpen={isOpen} onClose={onClose} isMobileMenu>
      <div className={css.header}>
        <ButtonWrapper buttonClassName={css.categoryBtn} icon='arrow-prev' onClick={onClose} />
        <h3>
          <FormattedMessage id='mobileCategoryList.title' defaultMessage='Категорія товарів' />
        </h3>
        <ButtonWrapper
          buttonClassName={css.categoryBtn}
          icon='close'
          onClick={() => {
            onClose();
            dispatch(closeMobileMenu());
          }}
        />
      </div>
      <div className={css.list}>
        {categories.map((category, index) => (
          <div key={index} className={css.item} onClick={() => handleCategoryClick(category)}>
            <FormattedMessage id={category.id} defaultMessage={category.defaultMessage} />
            <SvgIcon name='arrow-next'></SvgIcon>
          </div>
        ))}
      </div>
    </Modal>
  );
};
