import { Box, Grid } from '@mui/material';
import React from 'react';

import FSMCard from 'components/organisms/cards/FSMCard';
import useWidth from 'utils/UseWidth';
import NoDataFound from 'components/molecules/NoDataFound';

function FSMsGrid({ fsms, isLoading }) {
  const width = useWidth();

  const numberOfSkeleton = width === 'sm' || width === 'md' ? 4 : 3;

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {[...Array(numberOfSkeleton)].map((e, i) => (
          <Grid item key={i} xs={12} sm={6} lg={4}>
            <FSMCard isLoading={true} fsm={null} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (fsms.length > 0) {
    let tmpArr = [...fsms].sort((fsm1, fsm2) => fsm2.order_in_program - fsm1.order_in_program)
    return (
      <Grid container spacing={2}>
        {tmpArr.map((workshop) => (
          <Grid item key={workshop.id} xs={12} sm={6} lg={4}>
            <FSMCard fsm={workshop} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box my={4}>
      <NoDataFound variant={2} message={'هنوز کارگاه یا آزمونی وجود ندارد!'} />
    </Box>
  );

}

export default FSMsGrid;