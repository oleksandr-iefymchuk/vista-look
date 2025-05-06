import { Fragment, useState } from 'react';
import Login from './Login/Login';
import Registration from './Registration/Registration';

type Props = {
  isOpen: () => void;
  onClose: () => void;
};

export const Authentication = ({ isOpen, onClose }: Props) => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleAuthenticationModal = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Fragment>
      {showLogin ? (
        <Login isOpen={isOpen} onClose={onClose} toggleAuthenticationModal={toggleAuthenticationModal} />
      ) : (
        <Registration isOpen={isOpen} onClose={onClose} toggleAuthenticationModal={toggleAuthenticationModal} />
      )}
    </Fragment>
  );
};
