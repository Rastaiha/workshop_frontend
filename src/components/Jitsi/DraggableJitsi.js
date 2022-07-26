import { Paper, Box, Fade } from '@mui/material';
import React from 'react';
import Draggable from 'react-draggable';
import useWidth from '../../utils/UseWidth';
import Jitsi from './Jitsi';

function DraggableJitsi({ open, handleClose }) {
  const width = useWidth();

  return (
    <Fade in={open}>
      <Box
        sx={(theme) => ({
          position: 'fixed',
          left: 10,
          bottom: 10,
          width: 500,
          zIndex: 200,
          [theme.breakpoints.down('sm')]: {
            left: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
          },
        })}>
        <Draggable axis='x'>
          <Paper sx={{ boxShadow: '0px 1px 5px' }}>
            <Jitsi handleClose={handleClose} />
          </Paper>
        </Draggable>
      </Box>
    </Fade>
  );
}

export default DraggableJitsi;
