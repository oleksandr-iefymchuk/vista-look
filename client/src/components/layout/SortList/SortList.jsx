import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import './SortList.scss';

import Pagination from '../../layout/Pagination/Pagination';
import ButtonWrapper from '../../common/Button/Button';

const SortList = ({
  products,
  setShowFilterMenu,
  showFilterButton = false
}) => {
  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });
  const [sortType, setSortType] = useState('');

  const handleSortChange = e => {
    setSortType(e.target.value);
  };

  const sortProducts = type => {
    switch (type) {
      case 'priceAsc':
        return products.slice().sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return products.slice().sort((a, b) => b.price - a.price);
      case 'nameAsc':
        return products.slice().sort((a, b) => a.title.localeCompare(b.title));
      case 'nameDesc':
        return products.slice().sort((a, b) => b.title.localeCompare(a.title));
      case 'popularity':
        return products.slice().sort((a, b) => b.popularity - a.popularity);
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(sortType);
  return (
    <div className='sort-list-wrap'>
      {products.length > 0 && (
        <div
          className={`sort-list-block ${
            showFilterButton ? 'center' : 'justify-end'
          }`}
        >
          {isMobileDevice && showFilterButton && (
            <ButtonWrapper
              buttonClassName='filter-btn'
              icon='filter'
              buttonText='Фільтр'
              onClick={setShowFilterMenu}
            />
          )}

          <select
            className='sort-list-options'
            value={sortType}
            onChange={handleSortChange}
          >
            <option value=''>За замовчуванням</option>
            <option value='priceAsc'>Від дешевих до дорогих</option>
            <option value='priceDesc'>Від дорогих до дешевих</option>
            <option value='nameAsc'>Назва: від А до Я</option>
            <option value='nameDesc'>Назва: від Я до А</option>
            <option value='popularity'>За популярністю</option>
          </select>
        </div>
      )}
      <Pagination products={sortedProducts}></Pagination>
    </div>
  );
};

SortList.propTypes = {
  products: PropTypes.array.isRequired,
  setShowFilterMenu: PropTypes.func,
  showFilterButton: PropTypes.bool
};

export default SortList;
