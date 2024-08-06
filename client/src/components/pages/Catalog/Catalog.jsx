import './Catalog.scss';
import { useSelector } from 'react-redux';

import FilterProducts from '../../layout/FilterProducts/FilterProducts';

const Catalog = () => {
  const activeCategory = useSelector(store => store.app.selectedCategory);

  const products = useSelector(state => state.products);

  return (
    <div className='catalog-wrap'>
      <h2>{activeCategory || 'Каталог'}</h2>
      <FilterProducts products={products} showFilterButton={true} />
    </div>
  );
};

export default Catalog;
