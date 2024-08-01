import PropTypes from 'prop-types';
import logo from '../../../assets/logo.jpg';
import './Logo.scss';

const Logo = ({ onClick }) => {
  return <img className='logo' src={logo} alt='logo' onClick={onClick} />;
};

Logo.propTypes = {
  onClick: PropTypes.func
};
export default Logo;
