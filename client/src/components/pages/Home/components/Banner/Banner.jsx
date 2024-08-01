import './Banner.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import { banners } from '../../../../../constants/banners';
import ButtonWrapper from '../../../../common/Button/Button';

const Banner = () => {
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
    prevArrow: <ButtonWrapper buttonClassName='arrow-prev' icon='arrow-prev' />
  };

  return (
    <div className='banners-wrap'>
      <div className='slider-container'>
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <Link to={banner.route} key={index}>
              <div className='card'>
                <h2 className='bannerTitle'>{banner.title}</h2>
                <img src={banner.image} alt={banner.title} />
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
