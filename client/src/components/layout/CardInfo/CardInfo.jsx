import './CardInfo.scss';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { TabControlContext } from '../../../contexts/TabControlContext';
import {
  addToBasketThunk,
  addToFavoritesThunk,
  removeFromFavoritesThunk
} from '../../../store/user/thunk';
import { toggleLogineModal } from '../../../store/appReduser/actionCreators';
import { showMessage } from '../../../store/user/actionCreators';

import ButtonWrapper from '../../common/Button/Button';
import CardInfoTitle from './components/CardInfoTitle/CardInfoTitle';
import CardInfoDescription from './components/CardInfoDescription/CardInfoDescription';
import SizeSelector from '../../common/SizeSelector/SizeSelector';

const CardInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productSlug } = useParams();
  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });
  const navigationBasket = () => navigate('/basket');

  const [cardInfoQuantity, setcardInfoQuantity] = useState(1);
  const [value, setValue] = useState('description');
  const [selectedSize, setSelectedSize] = useState(null);

  const products = useSelector(state => state.products);
  const { favorites, basket, isAuthenticated } = useSelector(
    store => store.user
  );

  const cardInfo = products.find(product => product.slug === productSlug);

  const {
    _id,
    productCode,
    images,
    title,
    price,
    sizes,
    quantity,
    param,
    description
  } = cardInfo || {};

  const isInBasket = cardInfo
    ? basket.find(item => item.productId === _id)
    : null;
  const isFavorite = cardInfo ? favorites.some(item => item === _id) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToBasket = () => {
    if (!isAuthenticated) {
      dispatch(toggleLogineModal());
    }

    if (isAuthenticated && !isInBasket && !selectedSize) {
      dispatch(showMessage('Будь-ласка виберіть розмір', 'warning'));
    }

    if (isAuthenticated && !isInBasket && selectedSize) {
      dispatch(
        addToBasketThunk(_id, productCode, cardInfoQuantity, selectedSize)
      );
    }

    if (isAuthenticated && isInBasket && selectedSize) {
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

  const handleUpdateQuantity = update => {
    if (update === 'increase') {
      setcardInfoQuantity(cardInfoQuantity + 1);
    }
    if (update === 'decrease') {
      setcardInfoQuantity(cardInfoQuantity - 1);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    dotsClass: 'slick-dots slick-thumb',
    nextArrow: <ButtonWrapper buttonClassName='arrow-next' icon='arrow-next' />,
    prevArrow: <ButtonWrapper buttonClassName='arrow-prev' icon='arrow-prev' />,

    customPaging: function (i) {
      return (
        <a>
          <img src={images[i]} alt={title} />
        </a>
      );
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
    cardInfo && (
      <TabControlContext.Provider value={{ value, setValue }}>
        <div className='card-info-wrapper'>
          {isMobileDevice && (
            <CardInfoTitle
              _id={_id}
              productCode={productCode}
              title={title}
              quantity={quantity}
            />
          )}
          <div className='slider-container'>
            <Slider {...settings}>
              {images.map((image, index) => (
                <div className='card' key={index}>
                  <img src={image} alt={`${title} фото ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </div>

          <div className='card-info'>
            <div className='card-info-header'>
              {!isMobileDevice && (
                <CardInfoTitle
                  _id={_id}
                  productCode={productCode}
                  title={title}
                  quantity={quantity}
                />
              )}

              <div className='quantity-block'>
                {isMobileDevice && (
                  <span
                    className={
                      quantity !== 0
                        ? 'available-product'
                        : 'unavailable-product'
                    }
                  >
                    {quantity !== 0 ? 'В наявності' : 'Немає в наявності'}
                  </span>
                )}
                <p className='card-info-price'>{price} грн.</p>
                <SizeSelector
                  sizes={sizes}
                  selectedSize={selectedSize}
                  onSelectSize={setSelectedSize}
                  productId={_id}
                  isDisabled={quantity <= 0}
                />
                <div className='card-info-quantity'>
                  <ButtonWrapper
                    buttonClassName={
                      cardInfoQuantity <= 1 || isInBasket
                        ? 'disabled-btn-increase-quantity'
                        : 'active-btn-increase-quantity'
                    }
                    disabled={cardInfoQuantity <= 1 || isInBasket}
                    onClick={() => handleUpdateQuantity('decrease')}
                    icon='minus'
                  />
                  <p className='quantity'>
                    {isInBasket ? isInBasket.quantity : cardInfoQuantity}
                  </p>
                  <ButtonWrapper
                    buttonClassName={
                      cardInfoQuantity >= 10 || isInBasket || quantity <= 0
                        ? 'disabled-btn-increase-quantity'
                        : 'active-btn-increase-quantity'
                    }
                    disabled={
                      cardInfoQuantity >= 10 || isInBasket || quantity <= 0
                    }
                    onClick={() => handleUpdateQuantity('increase')}
                    icon='plus'
                  />

                  <ButtonWrapper
                    buttonClassName={`${
                      quantity <= 0 && (!isInBasket || isInBasket.quantity <= 0)
                        ? 'disabled-buy-btn'
                        : 'active-buy-btn'
                    } ${isInBasket ? 'in-basket' : ''}`}
                    disabled={
                      quantity <= 0 && (!isInBasket || isInBasket.quantity <= 0)
                    }
                    icon={isInBasket ? 'check-mark' : 'basket'}
                    buttonText={isInBasket ? 'В кошику' : 'До кошика'}
                    onClick={handleAddToBasket}
                  />
                </div>
                <div className='favorites-balance-controls'>
                  <ButtonWrapper
                    buttonClassName='balance-btn'
                    icon='balance'
                    onClick={() => console.log('balance-btn')}
                    buttonText={isMobileDevice && 'Порівняти'}
                  />
                  <ButtonWrapper
                    buttonClassName='favorites-btn'
                    icon={isFavorite ? 'favorites-filled' : 'favorites'}
                    svgColor='#f05a00'
                    buttonText={
                      isMobileDevice
                        ? isFavorite
                          ? 'В обраному'
                          : 'До обраного'
                        : ''
                    }
                    onClick={handleAddToFavotites}
                  />
                </div>
              </div>
            </div>
            <CardInfoDescription
              _id={_id}
              description={description}
              param={param}
            />
          </div>
        </div>
      </TabControlContext.Provider>
    )
  );
};

export default CardInfo;
