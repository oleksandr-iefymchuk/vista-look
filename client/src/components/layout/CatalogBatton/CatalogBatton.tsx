import css from './CatalogBatton.module.scss';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { toggleCategoryMenu } from '../../../store/appReduser/actionCreators';

import { ButtonWrapper } from '../../common/Button/Button';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

type Categories = {
  name: string;
  linkName: string;
};

type Props = {
  categories: Array<Categories>;
  buttonText: string;
  iconBurger: string;
  buttonClassName: string;
  closeMenu: () => void;
};

const CatalogBatton = ({ categories, buttonText, buttonClassName, iconBurger }: Props) => {
  const dispatch = useDispatch();
  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });

  const isShowCategoryMenu = useSelector(
    (state: { app: { isShowCategoryMenu: boolean } }) => state.app.isShowCategoryMenu
  );

  const toggleCategory = () => {
    dispatch(toggleCategoryMenu());
  };

  useEffect(() => {
    if (isShowCategoryMenu && isMobileDevice) {
      document.body.classList.add('category-menu-open');
    } else {
      document.body.classList.remove('category-menu-open');
    }
  }, [isShowCategoryMenu, isMobileDevice]);

  return (
    <Fragment>
      {isShowCategoryMenu && isMobileDevice && <div className={css.overlay} onClick={toggleCategory}></div>}
      <ButtonWrapper
        buttonClassName={buttonClassName}
        icon={!isShowCategoryMenu ? iconBurger : 'close'}
        onClick={toggleCategory}
        buttonText={buttonText}
      />
      {!isMobileDevice && <CategoryMenu categories={categories} />}
    </Fragment>
  );
};

export default CatalogBatton;
