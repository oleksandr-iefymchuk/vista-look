import './Breadcrumbs.scss';
import { Fragment, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  selectCategory,
  selectSubcategory
} from '../../../store/appReduser/actionCreators';
import Button from '../Button/Button';
import { breadcrumbLinks } from '../../../constants/breadcrumbLinks';

const Breadcrumbs = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathnameParts = location.pathname.split('/').filter(Boolean);
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
    dispatch(selectCategory(null));
    dispatch(selectSubcategory(null));
  };

  const handleGoCatalog = () => {
    navigate('/catalog');
    dispatch(selectCategory(null));
    dispatch(selectSubcategory(null));
  };

  const pathWithoutProductId = pathnameParts.filter(
    part => !part.match(/^\d+$/)
  );

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (location.pathname === '/') {
      mainElement.classList.add('home-page');
    } else {
      mainElement.classList.remove('home-page');
    }
  }, [location.pathname]);

  const generateBreadcrumbs = pathParts => {
    let path = '';
    return pathParts.map((part, index) => {
      path += '/' + part;
      const displayName = breadcrumbLinks[path] || part;
      return (
        <Fragment key={path}>
          {index === 0 ? (
            <Fragment>
              <Button
                icon='home'
                buttonClassName='link-home'
                onClick={handleGoHome}
              />
              {' / '}
            </Fragment>
          ) : (
            ''
          )}
          {part === 'catalog' ? (
            <a onClick={handleGoCatalog}>{displayName}</a>
          ) : (
            <Link to={path}>{displayName}</Link>
          )}
          {index < pathParts.length - 1 && <span> / </span>}
        </Fragment>
      );
    });
  };

  if (location.pathname !== '/') {
    return (
      <div className='breadcrumbs-wrap'>
        <div className='breadcrumbs'>
          {generateBreadcrumbs(pathWithoutProductId)}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Breadcrumbs;
