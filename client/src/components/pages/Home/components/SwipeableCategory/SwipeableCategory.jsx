import './SwipeableCategory.scss';
import { useSwipeable } from 'react-swipeable';
import PropTypes from 'prop-types';

const SwipeableCategory = ({ children, onSwipeLeft, onSwipeRight }) => {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: onSwipeLeft,
    onSwipedRight: onSwipeRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div className='swipeable-category-wrap' {...swipeHandlers}>
      {children}
    </div>
  );
};

SwipeableCategory.propTypes = {
  children: PropTypes.node.isRequired,
  onSwipeLeft: PropTypes.func.isRequired,
  onSwipeRight: PropTypes.func.isRequired
};

export default SwipeableCategory;
