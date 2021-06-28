import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loader2 = () => {
  return (
    <div className='loader-container'>
      <Spinner variant='info' animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader2;
