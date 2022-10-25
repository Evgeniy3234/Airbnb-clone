import React from 'react';
import './Loader.css';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box className='loader'>
      <Skeleton
        className="skel"
        variant="rounded"
        width={305}
        height={290}
      />
      <div className="skelDisc">
        <Skeleton
          className="title__skel"
          variant="rounded"
          width={155}
          height={81}
        />
        <Skeleton
          className="rate__skel"
          variant="rounded"
          width={45}
          height={21}
        />
      </div>
    </Box>
  );
};

export default Loader;
