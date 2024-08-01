import './CatalogBatton.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import { toggleCategoryMenu } from '../../../store/appReduser/actionCreators';

import ButtonWrapper from '../../common/Button/Button';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

const CatalogBatton = ({
  categories,
  buttonText,
  buttonClassName,
  svgWrapperClassName,
  iconBurger
}) => {
  const dispatch = useDispatch();
  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });

  const isShowCategoryMenu = useSelector(state => state.app.isShowCategoryMenu);

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
    <div className='catalog-btn-wrap'>
      {isShowCategoryMenu && isMobileDevice && (
        <div className='category-menu-overlay' onClick={toggleCategory}></div>
      )}
      <ButtonWrapper
        buttonClassName={buttonClassName}
        svgWrapperClassName={svgWrapperClassName}
        icon={!isShowCategoryMenu ? iconBurger : 'close'}
        onClick={toggleCategory}
        buttonText={buttonText}
      />
      {!isMobileDevice && <CategoryMenu categories={categories} />}
    </div>
  );
};

CatalogBatton.propTypes = {
  categories: PropTypes.array.isRequired,
  buttonText: PropTypes.string.isRequired,
  iconBurger: PropTypes.string,
  buttonClassName: PropTypes.string,
  svgWrapperClassName: PropTypes.string,
  closeMenu: PropTypes.func
};

export default CatalogBatton;
