import { useSelector } from 'react-redux';
import './Favorites.scss';

import SvgIcon from '../../common/SvgIcon';
import SortList from '../../layout/SortList/SortList';

const Favorites = () => {
  const favoriteProducts = useSelector(state => state.user.favorites);
  const allProducts = useSelector(state => state.products);

  const favorites = favoriteProducts.map(productId => {
    return allProducts.find(product => product._id === productId);
  });

  return (
    <section className='favorites-wrap'>
      <h2>Список бажань</h2>
      <p className='quantity-products'>
        Кількість товарів: {favorites.length}{' '}
      </p>
      {favorites.length > 0 ? (
        <SortList products={favorites}></SortList>
      ) : (
        <div className='empty-basket'>
          <SvgIcon
            name='empty-favorites'
            color='#a2a2a2'
            width='200px'
            height='200px'
          />
          <p>Список бажань пустий :(</p>
        </div>
      )}
    </section>
  );
};

export default Favorites;
