import './ControlBlock.scss';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { searchProduct, toggleMobileMenu } from '../../../../../store/appReduser/actionCreators';

import { PLACEHOLDER_LABELS, BUTTON_LABELS, BREAKPOINTS } from '../../../../../constants/constants';
import { categories } from '../../../../../constants/categories';

import { Logo } from '../../../../common/Logo/Logo';
import UserBox from './components/UserBox/UserBox';
import { ButtonWrapper } from '../../../../common/Button/Button';
import InputWrapper from '../../../../common/Input/Input';
import MobileMenu from '../../../../layout/MobileMenu/MobileMenu';
import { CategoryList } from '@/components/pages/Header/components/ControlBlock/components/CategoryList/CategoryList';

const ControlBlock = () => {
  const { BUTTON_SEARCH, BUTTON_CATALOG } = BUTTON_LABELS;
  const { SEARCH_PLACEHOLDER } = PLACEHOLDER_LABELS;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const categoryMenuRef = useRef(null);
  const catalogRef = useRef(null);

  const navigationHome = () => navigate('/');
  const navigationSearchList = () => navigate('/search');

  const isMobileDevice = useMediaQuery({ maxWidth: BREAKPOINTS.TABLET });
  const isShowMobileMenu = useSelector((state) => state.app.isShowMobileMenu);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleSearchSubmit = () => {
    dispatch(searchProduct(searchValue));
    navigationSearchList();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showCategoryMenu && catalogRef.current && !catalogRef.current.contains(e.target)) {
        setShowCategoryMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCategoryMenu]);

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
            <div className='catalog-btn-wrap' ref={catalogRef}>
              <ButtonWrapper
                buttonClassName='catalog-btn'
                icon={!showCategoryMenu ? 'menu' : 'close'}
                onClick={() => setShowCategoryMenu((prev) => !prev)}
                buttonText={BUTTON_CATALOG}
              />
              {!isMobileDevice && (
                <CategoryList categories={categories} isOpen={showCategoryMenu} onClose={() => setShowCategoryMenu(false)} />
              )}
            </div>
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
