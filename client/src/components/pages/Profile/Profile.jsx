import './Profile.scss';
import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { isAuthenticated, isAdmin } = useSelector(store => store.user);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate, loading]);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  return (
    <div className='user-profile-wrap'>
      <h2>Особистий кабінет</h2>
      <div className='user-profile'>
        <nav className='profile-sidebar'>
          <ul>
            <li>
              <Link to='personal-info'>Особиста інформація</Link>
            </li>
            <li>
              <Link to='personal-orders'>
                {isAdmin ? 'Замовення клієнтів' : 'Історія замовлень'}
              </Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
