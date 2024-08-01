import './Progress.scss';
import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

const Progress = () => {
  const isLoading = useSelector(state => state.app.isLoading);

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }
  }, [isLoading]);

  return (
    <Fragment>
      {isLoading && (
        <div className='circularProgressWrap'>
          <CircularProgress className='circularProgress' />
        </div>
      )}
    </Fragment>
  );
};

export default Progress;
