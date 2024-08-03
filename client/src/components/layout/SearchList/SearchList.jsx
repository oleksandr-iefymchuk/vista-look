import './SearchList.scss';
import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import questionMark from '../../../assets/question-mark.webp';

import ButtonWrapper from '../../common/Button/Button';
import SortList from '../../layout/SortList/SortList';

const SearchList = () => {
  const searchValue = useSelector(state => state.app.searchValue);
  const allProducts = useSelector(state => state.products);
  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterProducts = (products, searchValue) => {
    return products.filter(({ productCode, title }) => {
      const filteredById = productCode
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const filteredByTitle = title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      return filteredById || filteredByTitle;
    });
  };

  const isEmptySearchField = !searchValue || searchValue.trim() === '';

  useEffect(() => {
    if (!isEmptySearchField) {
      const filtered = filterProducts(allProducts, searchValue);
      setFilteredProducts(filtered);
    }
  }, [searchValue, allProducts, isEmptySearchField]);

  return (
    <div className='search-list-wrap'>
      {filteredProducts.length > 0 ? (
        <Fragment>
          <h2 className='search-list-title'>
            Результати пошуку &quot;
            <span className='search-value'>{searchValue}</span>&quot;
          </h2>
          <SortList products={filteredProducts}></SortList>
        </Fragment>
      ) : (
        <div className='empty-search-list'>
          <img src={questionMark} alt='question mark' />
          <div className='search-info'>
            <h2 className='empty-search-list-title'>
              За запитом &quot;
              <span className='search-value'>{searchValue}</span>&quot; нічого
              не знайдено :(
            </h2>
            <p>
              Перевірте правильність написання запиту, спробуйте використати
              синоніми чи більш загальні запити.
            </p>
            <ButtonWrapper
              buttonClassName='catalog-btn'
              onClick={() => navigate('/catalog')}
              buttonText='Скористатись каталогом'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchList;
