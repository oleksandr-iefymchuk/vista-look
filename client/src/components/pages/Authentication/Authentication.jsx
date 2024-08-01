import './Authentication.scss';
import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

const Authentication = ({ openModalForm, closeModalForm }) => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleAuthenticationModal = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Fragment>
      {showLogin ? (
        <Login
          openModalForm={openModalForm}
          closeModalForm={closeModalForm}
          toggleAuthenticationModal={toggleAuthenticationModal}
        />
      ) : (
        <Registration
          openModalForm={openModalForm}
          closeModalForm={closeModalForm}
          toggleAuthenticationModal={toggleAuthenticationModal}
        />
      )}
    </Fragment>
  );
};

Authentication.propTypes = {
  openModalForm: PropTypes.bool,
  closeModalForm: PropTypes.func
};

export default Authentication;
