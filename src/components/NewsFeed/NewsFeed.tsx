import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Grid, Divider, Chip, Stack } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Simulated news data
    setNews([
      { 
        id: 1, 
        title: "Flood Alert in Hyderabad", 
        description: "Heavy rainfall expected over next 24 hours. Stay away from low-lying areas near Musi river and follow bypass routes.", 
        date: "2026-04-12",
        priority: 'high'
      },
      { 
        id: 2, 
        title: "Relief Center Functional", 
        description: "A major relief center is now operational at Jubilee Hills Public School. Medical aid and food supplies available.", 
        date: "2026-04-11",
        priority: 'medium'
      },
      { 
        id: 3, 
        title: "Logistics Call: Blankets Needed", 
        description: "Urgent request for 500 blankets and 2000 water bottles at the Secunderabad Collection Hub.", 
        date: "2026-04-10",
        priority: 'high'
      }
    ]);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      default: return 'info';
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <NewspaperIcon color="primary" fontSize="large" />
        <Typography variant="h4" fontWeight="bold">Emergency News Feed</Typography>
      </Stack>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={3}>
        {news.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card 
              elevation={2} 
              sx={{ 
                borderRadius: 2, 
                borderLeft: '6px solid',
                borderColor: `${getPriorityColor(item.priority)}.main`
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Typography variant="h5" fontWeight="600" color="textPrimary">
                    {item.title}
                  </Typography>
                  <Chip 
                    label={item.priority.toUpperCase()} 
                    size="small" 
                    color={getPriorityColor(item.priority) as any} 
                    variant="outlined" 
                  />
                </Stack>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                  {item.description}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" color="text.disabled">
                  <CalendarMonthIcon fontSize="small" />
                  <Typography variant="caption" fontWeight="500">
                    Published on {item.date}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewsFeed;