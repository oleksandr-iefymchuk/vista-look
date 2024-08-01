import './Catalog.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import FilterProducts from '../../layout/FilterProducts/FilterProducts';

const Catalog = () => {
  const activeCategory = useSelector(store => store.app.selectedCategory);

  const products = useSelector(state => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
    if (activeCategory) {
      const filteredByCategory = products.filter(
        product => product.category === activeCategory
      );
      setFilteredProducts(filteredByCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  return (
    <div className='catalog-wrap'>
      <h2>{activeCategory || 'Каталог'}</h2>
      <FilterProducts products={filteredProducts} showFilterButton={true} />
    </div>
  );
};

export default Catalog;
