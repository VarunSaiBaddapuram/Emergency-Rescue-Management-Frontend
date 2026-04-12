import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        minHeight: '100vh', 
        bgcolor: '#f8f9fa',
        width: '100%'
      }}
    >
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 1, md: 4 },
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;