import React from 'react';
import { Box, Typography, Button, TextField, Paper, Stack, InputAdornment } from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const Donate: React.FC = () => {
  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Redirecting to payment gateway... Thank you for your support!");
  };

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, textAlign: 'center' }}>
      <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
        ❤️ Support Our Mission
      </Typography>
      <Typography variant="h6" color="textSecondary" sx={{ mb: 6 }}>
        Your donations help us provide food, shelter, and medical aid to disaster-affected communities.
      </Typography>

      <Paper 
        elevation={4} 
        sx={{ 
          p: 5, 
          maxWidth: 550, 
          mx: 'auto', 
          borderRadius: 3,
          background: 'linear-gradient(to bottom, #ffffff, #fdfdfd)'
        }}
      >
        <Stack spacing={4} component="form" onSubmit={handleDonate}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
            <VolunteerActivismIcon color="error" sx={{ fontSize: 60 }} />
          </Box>
          
          <Typography variant="h5" fontWeight="600">Enter Donation Amount</Typography>
          
          <TextField
            fullWidth
            label="Amount"
            variant="outlined"
            type="number"
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
          />
          
          <TextField
            fullWidth
            label="Full Name (Optional)"
            variant="outlined"
            size="small"
          />

          <Button 
            variant="contained" 
            size="large" 
            fullWidth 
            type="submit"
            sx={{ py: 2, fontSize: '1.1rem', fontWeight: 'bold' }}
          >
            Donate Now
          </Button>
          
          <Typography variant="caption" color="textSecondary">
            100% of your donation goes directly to relief efforts. Secure payment powered by Razorpay.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Donate;