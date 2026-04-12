import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography, Paper, Divider, Chip, Stack } from "@mui/material";
import { reliefApi } from "../../../api/reliefApi";
import { toast } from "react-toastify";
import { ReliefSupplyRequest } from "../../../types/relief.types";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WarehouseIcon from "@mui/icons-material/Warehouse";

const Delivery: React.FC = () => {
  const [requests, setRequests] = useState<ReliefSupplyRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await reliefApi.getSupplyRequests();
        setRequests(data);
      } catch (err) {
        toast.error("Failed to load delivery requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'dispatched': return 'info';
      case 'accepted': return 'warning';
      case 'delivered': return 'success';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        🚚 Dispatch Tracking
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Live monitoring of essential supplies moving between collection hubs and relief centers.
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {loading ? (
        <Typography align="center">Loading dispatch records...</Typography>
      ) : (
        <Grid container spacing={3}>
          {requests.map((request) => (
            <Grid item xs={12} md={6} key={request._id}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  borderLeft: '6px solid',
                  borderColor: `${getStatusColor(request.Status)}.main`
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" fontWeight="bold">
                    {request.ItemName}
                  </Typography>
                  <Chip 
                    label={request.Status.toUpperCase()} 
                    color={getStatusColor(request.Status) as any}
                    size="small" 
                    variant="outlined" 
                  />
                </Stack>

                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <WarehouseIcon fontSize="small" color="action" />
                    <Typography variant="body2"><strong>Destination:</strong> {request.CenterName}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LocalShippingIcon fontSize="small" color="action" />
                    <Typography variant="body2"><strong>Quantity:</strong> {request.Quantity}</Typography>
                  </Stack>
                  {request.DriverPhone && (
                    <Typography variant="body2" sx={{ mt: 1, p: 1, bgcolor: '#f0f4f8', borderRadius: 1 }}>
                      <strong>Driver Contact:</strong> {request.DriverPhone}
                    </Typography>
                  )}
                </Stack>
              </Paper>
            </Grid>
          ))}
          {requests.length === 0 && (
            <Grid item xs={12}>
              <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#f8f9fa' }}>
                <Typography color="textSecondary">No active dispatches at this time.</Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
}

export default Delivery;