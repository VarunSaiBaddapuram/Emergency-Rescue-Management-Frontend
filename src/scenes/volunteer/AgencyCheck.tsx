import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

const AgencyCheck: React.FC = () => {
  return (
    <Box 
      sx={{ 
        minHeight: 'calc(100vh - 64px)', 
        bgcolor: '#f1f3f5',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </Box>
  );
};

export default AgencyCheck;
