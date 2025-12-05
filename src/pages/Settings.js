import React, { useEffect, useState } from "react";
import { fetchConfig, updateConfig } from "../api";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Fade,
  Alert,
  Skeleton,
  Avatar,
  Stack,
  CircularProgress
} from "@mui/material";
import { Mobile, Setting2, Eye, EyeSlash } from "iconsax-react";

const Settings = () => {
  // Matches your Backend variable: launcherVisible
  const [config, setConfig] = useState({ launcherVisible: true }); 
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // 1. Load Initial State from Backend
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchConfig();
        if (data) {
          setConfig(data);
        }
      } catch (err) {
        setError("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // 2. Handle Toggle
  const handleToggle = async (event) => {
    const isVisible = event.target.checked;
    
    // Store previous state in case we need to revert
    const previousConfig = { ...config };

    // Optimistic UI Update (Update screen before server responds)
    setConfig({ ...config, launcherVisible: isVisible });
    setSaving(true);

    try {
      // Send the exact key your backend expects: "launcherVisible"
      await updateConfig({ launcherVisible: isVisible });
    } catch (err) {
      console.error(err);
      setError("Failed to save setting. Reverting...");
      setConfig(previousConfig); // Revert UI on error
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Skeleton variant="text" width={250} height={60} />
        <Skeleton variant="rounded" height={200} sx={{ mt: 3, borderRadius: 4 }} />
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8f9fa", py: 4 }}>
      <Container maxWidth="md">
        
        {/* Header */}
        <Box mb={4} display="flex" alignItems="center">
          <Avatar variant="rounded" sx={{ bgcolor: "#e3f2fd", color: "#1976d2", mr: 2 }}>
            <Setting2 size="24" variant="Bold" />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight={800} color="#1a1c20">
              System Configuration
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Control device behavior remotely.
            </Typography>
          </Box>
        </Box>

        {error && (
          <Fade in>
            <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
              {error}
            </Alert>
          </Fade>
        )}

        {/* Settings Card */}
        <Card
          elevation={0}
          sx={{
            borderRadius: "20px",
            border: "1px solid rgba(0,0,0,0.08)",
            bgcolor: "white",
            overflow: "visible"
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
              
              {/* Left Side: Icon & Info */}
              <Box display="flex">
                <Avatar
                  sx={{
                    // Green if Visible, Red if Hidden
                    bgcolor: config.launcherVisible ? "#e8f5e9" : "#ffebee",
                    color: config.launcherVisible ? "#2e7d32" : "#c62828",
                    width: 48,
                    height: 48,
                    mr: 2.5,
                    transition: "0.3s"
                  }}
                >
                  <Mobile size="24" variant="Bold" />
                </Avatar>
                
                <Box>
                  <Typography variant="h6" fontWeight={700} color="text.primary">
                    App Launcher Visibility
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mt: 0.5 }}>
                    {config.launcherVisible 
                      ? "The App Icon is currently VISIBLE on the device home screen."
                      : "The App Icon is HIDDEN. The user cannot see the launcher icon."}
                  </Typography>
                  
                  {/* Status Indicator Chip */}
                  <Box mt={1.5} display="flex" alignItems="center">
                    {config.launcherVisible ? (
                       <Box display="flex" alignItems="center" color="#2e7d32">
                          <Eye size="16" />
                          <Typography variant="caption" fontWeight={700} ml={0.5}>VISIBLE</Typography>
                       </Box>
                    ) : (
                       <Box display="flex" alignItems="center" color="#c62828">
                          <EyeSlash size="16" />
                          <Typography variant="caption" fontWeight={700} ml={0.5}>HIDDEN</Typography>
                       </Box>
                    )}
                  </Box>
                </Box>
              </Box>

              {/* Right Side: Toggle Switch */}
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                <FormControlLabel
                  control={
                    <Switch
                      checked={!!config.launcherVisible} // Ensure boolean
                      onChange={handleToggle}
                      disabled={saving}
                      inputProps={{ 'aria-label': 'toggle launcher' }}
                      sx={{ transform: "scale(1.2)", mr: 1 }}
                    />
                  }
                  label=""
                />
                {saving && (
                  <Fade in>
                    <Box display="flex" alignItems="center" mt={1}>
                      <CircularProgress size={12} sx={{ mr: 1 }} />
                      <Typography variant="caption" color="text.secondary">Saving...</Typography>
                    </Box>
                  </Fade>
                )}
              </Box>

            </Stack>
          </CardContent>
        </Card>

      </Container>
    </Box>
  );
};

export default Settings;