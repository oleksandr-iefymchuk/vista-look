import './CardProduct.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { calculateDiscountedPrice, isNewProduct } from '../../../helpers';

import {
  addToBasketThunk,
  addToFavoritesThunk,
  removeFromFavoritesThunk,
  updateBasketItemSizeThunk
} from '../../../store/user/thunk';
import { toggleLogineModal } from '../../../store/appReduser/actionCreators';
import { delProductThunk } from '../../../store/products/thunk';

import ButtonWrapper from '../../common/Button/Button';
import ConfirmDialog from '../../common/ConfirmDialog/ConfirmDialog';
import SizeSelector from '../../common/SizeSelector/SizeSelector';

const CardProduct = ({
  _id,
  productCode,
  images,
  title,
  slug,
  price,
  sizes,
  quantity,
  discount,
  dateAdded
}) => {
  const navigate = useNavigate();
  const navigationBasket = () => navigate('/basket');

  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);
  const products = useSelector(state => state.products);
  const { favorites, basket, isAuthenticated, isAdmin } = useSelector(
    store => store.user
  );

  const currentProduct = products.find(product => product._id === _id);

  const isFavorite = favorites.some(item => item === _id);
  const isInBasket = basket
    ? basket.find(item => item.productId === _id)
    : null;
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
      dispatch(addToBasketThunk(_id, productCode, 1, selectedSize));
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

  const handleSizeChange = size => {
    setSelectedSize(size);
    if (isInBasket && size !== isInBasket.size) {
      dispatch(updateBasketItemSizeThunk(_id, size));
    }
  };

  useEffect(() => {
    if (isInBasket) {
      setSelectedSize(isInBasket.size);
    } else if (sizes && sizes.length > 0) {
      setSelectedSize(sizes[0]);
    }
  }, [sizes, isInBasket]);

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
        <Link to={`/${slug}`} className='card-product-img-container'>
          <img src={images[0]} alt={title} />
        </Link>
        {isAdmin && (
          <div className='product-control-block'>
            <Link to={`/profile/product-form/${slug}`}>
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

          <SizeSelector
            sizes={sizes}
            selectedSize={selectedSize}
            onSelectSize={handleSizeChange}
            productId={_id}
            isDisabled={
              currentProduct?.quantity <= 0 &&
              (!isInBasket || isInBasket.quantity <= 0)
            }
          />

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
                currentProduct?.quantity <= 0 &&
                (!isInBasket || isInBasket.quantity <= 0)
                  ? 'disabled-buy-btn'
                  : 'active-buy-btn'
              } ${isInBasket ? 'in-basket' : ''}`}
              disabled={
                currentProduct?.quantity <= 0 &&
                (!isInBasket || isInBasket.quantity <= 0)
              }
              icon={isInBasket ? 'full-basket' : 'basket'}
              onClick={() => handleAddToBasket()}
            />
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDeleteProduct}
        title='Підтвердження видалення товару'
        content='Ви впевнені, що бажаєте видалити цей товар?'
      />
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
  sizes: PropTypes.array,
  quantity: PropTypes.number,
  dateAdded: PropTypes.string,
  discount: PropTypes.number
};

export default CardProduct;
