import PropTypes from 'prop-types';
import { svgOption } from '../../constants/constants';
import sprite from '../../assets/sprite.svg';

const { DEFAULT_SIZE, DEFAULT_COLOR } = svgOption;

const SvgIcon = ({
  name,
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  color = DEFAULT_COLOR
}) => {
  return (
    <svg stroke={color} fill={color} width={width} height={height}>
      <use xlinkHref={`${sprite}#${name}`} />
    </svg>
  );
};

SvgIcon.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string
};

export default SvgIcon;
