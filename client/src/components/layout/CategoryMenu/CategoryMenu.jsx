import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './CategoryMenu.scss';
import { useMediaQuery } from 'react-responsive';
import {
  selectCategory,
  selectSubcategory,
  closeCategoryMenu,
  closeMobileMenu
} from '../../../store/appReduser/actionCreators';

import ButtonWrapper from '../../common/Button/Button';
import SvgIcon from '../../common/SvgIcon';

const CategoryMenu = ({ categories }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });

  const isShowCategoryMenu = useSelector(state => state.app.isShowCategoryMenu);

  const handleCategoryClick = async category => {
    dispatch(selectCategory(category.name));
    dispatch(selectSubcategory(null));
    dispatch(closeCategoryMenu());
    dispatch(closeMobileMenu());
    navigate(`/catalog/${category.linkName}`);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div
      className={`category-menu ${isShowCategoryMenu ? 'show' : 'hide'}`}
      onMouseLeave={handleMouseLeave}
    >
      {isMobileDevice && (
        <div className='category-header'>
          <ButtonWrapper
            buttonClassName='category-btn'
            icon='arrow-prev'
            color='#008ec8'
            onClick={() => dispatch(closeCategoryMenu())}
          />
          <h3>Категорія товарів</h3>
          <ButtonWrapper
            buttonClassName='category-btn'
            icon='close'
            color='#008ec8'
            onClick={() => {
              dispatch(closeCategoryMenu());
              dispatch(closeMobileMenu());
            }}
          />
        </div>
      )}
      <div className='category-list'>
        {categories.map((categoryData, index) => (
          <div
            key={index}
            className={`category-item ${
              hoveredCategory === categoryData.name ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick(categoryData)}
          >
            {categoryData.name}
            {isMobileDevice && <SvgIcon name='arrow-next'></SvgIcon>}
          </div>
        ))}
      </div>
    </div>
  );
};

CategoryMenu.propTypes = {
  categories: PropTypes.array.isRequired,
  isShowCategoryMenu: PropTypes.bool,
  closeCategoryMenu: PropTypes.func,
  closeMenu: PropTypes.func
};

export default CategoryMenu;
