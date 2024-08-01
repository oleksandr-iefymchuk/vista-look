import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Novelty.scss';
import { isNewProduct } from '../../../helpers';
import FilterProducts from '../../layout/FilterProducts/FilterProducts';

const Novelty = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const products = useSelector(state => state.products);
  const newProducts = products.filter(product =>
    isNewProduct(product.dateAdded)
  );

  useEffect(() => {
    if (newProducts) {
      setFilteredProducts(newProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='novelty-wrap'>
      <h2>Новинки</h2>
      <FilterProducts products={filteredProducts} showFilterButton={true} />
    </div>
  );
};

export default Novelty;
