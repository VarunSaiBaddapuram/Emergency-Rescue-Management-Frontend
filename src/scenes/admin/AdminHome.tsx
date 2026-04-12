import React from "react";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const AdminHome: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Admin Dashboard
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Welcome back, {user?.firstName ? `${user.firstName} ${user.lastName}` : "Admin"}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>Supply Management</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Monitor and coordinate disaster relief center activities and inventory.
            </Typography>
            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              onClick={() => navigate('/agency/relief-center')}
            >
              Manage Relief Centers
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>Collection Points</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Manage donation collection centers and logistics distribution.
            </Typography>
            <Button 
              variant="contained" 
              color="secondary"
              fullWidth 
              size="large"
              onClick={() => navigate('/agency/collection-center')}
            >
              Manage Collection Centers
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminHome;