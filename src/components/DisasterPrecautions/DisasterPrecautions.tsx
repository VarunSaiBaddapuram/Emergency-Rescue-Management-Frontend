import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Paper, Grid } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const DisasterPrecautions: React.FC = () => {
  const precautions = [
    {
      title: "Before a Disaster",
      items: [
        "Create an emergency kit (water, food, flashlight, batteries).",
        "Know your local evacuation routes and shelters.",
        "Sign up for local emergency alerts.",
        "Have a family communication plan in place."
      ],
      type: "preparation"
    },
    {
      title: "During a Disaster",
      items: [
        "Stay informed through a battery-powered radio or emergency alerts.",
        "Follow evacuation orders immediately if given.",
        "Stay indoors unless told to evacuate.",
        "Avoid floodwaters and downed power lines."
      ],
      type: "action"
    },
    {
      title: "After a Disaster",
      items: [
        "Check for injuries and provide first aid if qualified.",
        "Only return home when authorities say it is safe.",
        "Be careful when entering damaged buildings.",
        "Inspect for gas leaks, electrical damage, or water line breaks."
      ],
      type: "recovery"
    }
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h3" fontWeight="bold" align="center" gutterBottom color="primary">
        🛡️ Safety & Precautions
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" sx={{ mb: 4 }}>
        Essential guidelines to keep you and your loved ones safe during emergencies.
      </Typography>
      
      <Divider sx={{ mb: 5 }} />

      <Grid container spacing={4}>
        {precautions.map((section, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
              <Typography variant="h5" color="secondary" gutterBottom fontWeight="600">
                {section.title}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <List>
                {section.items.map((item, i) => (
                  <ListItem key={i} disableGutters alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                      {section.type === "preparation" ? (
                        <CheckCircleOutlineIcon color="success" fontSize="small" />
                      ) : (
                        <ErrorOutlineIcon color="info" fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DisasterPrecautions;