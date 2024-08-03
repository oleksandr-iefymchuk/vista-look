import './ControlBlock.scss';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import {
  searchProduct,
  toggleMobileMenu
} from '../../../../../store/appReduser/actionCreators';

import {
  PLACEHOLDER_LABELS,
  BUTTON_LABELS
} from '../../../../../constants/constants';
import { categories } from '../../../../../constants/categories';

import Logo from '../../../../common/Logo/Logo';
import UserBox from './components/UserBox/UserBox';
import ButtonWrapper from '../../../../common/Button/Button';
import InputWrapper from '../../../../common/Input/Input';
import CatalogBatton from '../../../../layout/CatalogBatton/CatalogBatton';
import MobileMenu from '../../../../layout/MobileMenu/MobileMenu';

const ControlBlock = () => {
  const { BUTTON_SEARCH, BUTTON_CATALOG } = BUTTON_LABELS;
  const { SEARCH_PLACEHOLDER } = PLACEHOLDER_LABELS;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const navigationHome = () => navigate('/');
  const navigationSearchList = () => navigate('/search');

  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });
  const isShowMobileMenu = useSelector(state => state.app.isShowMobileMenu);

  const handleSearchChange = e => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleSearchSubmit = () => {
    dispatch(searchProduct(searchValue));
    navigationSearchList();
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className='control-block-wrap'>
      <div className='control-block'>
        <Logo className='logo' onClick={navigationHome} />

        {isMobileDevice ? (
          <Fragment>
            <ButtonWrapper
              buttonClassName='mobile-menu-btn'
              icon={!isShowMobileMenu ? 'burger' : 'close'}
              onClick={() => dispatch(toggleMobileMenu())}
            />
            <MobileMenu />
          </Fragment>
        ) : (
          <Fragment>
            <CatalogBatton
              buttonBlockClassName='catalog-btn-wrap'
              buttonClassName='catalog-btn'
              buttonText={BUTTON_CATALOG}
              categories={categories}
              isShowButtonText={!isMobileDevice}
              iconBurger='menu'
            />
            {/* <CategoryMenu categories={categories} /> */}
          </Fragment>
        )}

        <div className='search-bar'>
          <InputWrapper
            placeholder={SEARCH_PLACEHOLDER}
            type='text'
            value={searchValue}
            onChangeInput={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <ButtonWrapper
            disabled={searchValue.trim() === ''}
            buttonClassName='search-btn'
            buttonText={!isMobileDevice && BUTTON_SEARCH}
            icon={isMobileDevice && 'search'}
            onClick={handleSearchSubmit}
          />
        </div>
        <UserBox />
      </div>
    </div>
  );
};

export default ControlBlock;
