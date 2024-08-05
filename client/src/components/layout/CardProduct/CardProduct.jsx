import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { calculateDiscountedPrice, isNewProduct } from '../../../helpers';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import './CardProduct.scss';
import ButtonWrapper from '../../common/Button/Button';

import {
  addToBasketThunk,
  addToFavoritesThunk,
  removeFromFavoritesThunk
} from '../../../store/user/thunk';
import { toggleLogineModal } from '../../../store/appReduser/actionCreators';
import { delProductThunk } from '../../../store/products/thunk';

const CardProduct = ({
  _id,
  productCode,
  images,
  title,
  slug,
  price,
  quantity,
  discount,
  dateAdded
}) => {
  const navigate = useNavigate();
  const navigationBasket = () => navigate('/basket');

  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const { favorites, basket, isAuthenticated, isAdmin } = useSelector(
    store => store.user
  );

  const currentProduct = products.find(product => product._id === _id);
  const currentBasketProduct = basket.find(product => product._id === _id);

  const isFavorite = favorites.some(item => item === _id);
  const isInBasket = basket.some(item => item.productId === _id);

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleDeleteProduct = async () => {
    dispatch(delProductThunk(_id));
    handleCloseDialog();
  };

  const handleAddToBasket = () => {
    if (!isAuthenticated) {
      dispatch(toggleLogineModal());
    }

    if (isAuthenticated && !isInBasket) {
      dispatch(addToBasketThunk(_id, 1));
    }

    if (isAuthenticated && isInBasket) {
      navigationBasket();
    }
  };

  const handleAddToFavotites = () => {
    if (!isAuthenticated) {
      dispatch(toggleLogineModal());
    }
    if (isAuthenticated && !isFavorite) {
      dispatch(addToFavoritesThunk(_id));
    }
    if (isAuthenticated && isFavorite) {
      dispatch(removeFromFavoritesThunk(_id));
    }
  };

  return (
    <>
      <div className='card-product'>
        <div className='badges'>
          {isNewProduct(dateAdded) && (
            <span className='badge-new'>Новинка</span>
          )}
          {discount > 0 && <span className='badge-discount'>-{discount}%</span>}
        </div>

        <ButtonWrapper
          buttonBlockClassName='favorites-btn-wrap'
          buttonClassName='favorites-btn'
          icon={isFavorite ? 'favorites-filled' : 'favorites'}
          svgColor='#f05a00'
          onClick={handleAddToFavotites}
        />
        <Link to={`/${slug}`}>
          <img src={images[0]} alt={title} />
        </Link>
        {isAdmin && (
          <div className='product-control-block'>
            <Link to={`/product/update/${slug}`}>
              <ButtonWrapper buttonClassName='product-update-btn' icon='pen' />
            </Link>
            <ButtonWrapper
              buttonClassName='product-del-btn'
              icon='delete'
              onClick={handleOpenDialog}
            />
          </div>
        )}

        <div className='card-product-info'>
          <p>Код: {productCode}</p>
          <Link to={`/${slug}`}>
            <h3>{title}</h3>
          </Link>
          <p
            className={
              quantity !== 0 ? 'available-product' : 'unavailable-product'
            }
          >
            {quantity !== 0 ? 'В наявності' : 'Немає в наявності'}
          </p>

          <div className='card-product-price'>
            <div className='price'>
              <p
                className={`old-price ${discount > 0 ? 'discounted-price' : ''}`}
              >
                {new Intl.NumberFormat(undefined, {
                  style: 'currency',
                  currency: 'UAH'
                }).format(price)}
              </p>
              {discount > 0 && (
                <p className='new-price'>
                  {new Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currency: 'UAH'
                  }).format(calculateDiscountedPrice(price, discount))}
                </p>
              )}
            </div>

            <ButtonWrapper
              buttonClassName={`${
                currentProduct.quantity <= 0 &&
                (!currentBasketProduct || currentBasketProduct.quantity <= 0)
                  ? 'disabled-buy-btn'
                  : 'active-buy-btn'
              } ${isInBasket ? 'in-basket' : ''}`}
              disabled={
                currentProduct.quantity <= 0 &&
                (!currentBasketProduct || currentBasketProduct.quantity <= 0)
              }
              icon={isInBasket ? 'full-basket' : 'basket'}
              onClick={() => handleAddToBasket()}
            />
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Підтвердження видалення товару</DialogTitle>
        <DialogContent>
          Ви впевнені, що бажаєте видалити цей товар?
        </DialogContent>
        <DialogActions>
          <ButtonWrapper
            buttonClassName='dialog-btn'
            onClick={handleCloseDialog}
            buttonText='Відміна'
          />
          <ButtonWrapper
            buttonClassName='dialog-btn'
            onClick={handleDeleteProduct}
            buttonText='Видалити'
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

CardProduct.propTypes = {
  _id: PropTypes.string,
  productCode: PropTypes.string,
  images: PropTypes.array,
  title: PropTypes.string,
  slug: PropTypes.string,
  subcategory: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  dateAdded: PropTypes.string,
  discount: PropTypes.number
};

export default CardProduct;
