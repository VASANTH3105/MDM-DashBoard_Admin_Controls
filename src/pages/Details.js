import { useEffect, useState } from "react";
import { fetchDeviceData } from "../api";

import {
  Box,
  Typography,
  Grid,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
} from "@mui/material";

import {
  Cpu,
  BatteryCharging,
  Wifi,
  Map1,
  Global,
  Gallery,
} from "iconsax-react";

import InfoCard from "../components/InfoCard";
import SectionHeader from "../components/SectionHeader";
import TimestampCard from "../components/TimestampCard";
import LocationMap from "../components/LocationMap";

const Details = () => {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("system");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetchDeviceData();
        setData(response);
      } catch (error) {
        console.error("Error loading details", error);
      }
    };
    load();
  }, []);

  if (!data) return <p style={{ padding: 20 }}>Loading...</p>;

  const { payload } = data;

  const systemApps = payload?.installedApps.filter((x) => x.type === "system");
  const userApps = payload?.installedApps.filter((x) => x.type === "user");

  return (
    <Box sx={{ padding: 3 }}>
      {/* Main Title */}
      <Typography variant="h4" fontWeight={700} mb={2}>
        Device Overview
      </Typography>

      <TimestampCard
        utc={data?.receivedAtUTC}
        ist={data?.receivedAtIST}
        readable={data?.readableTime}
      />

      {/* ===================== DEVICE INFORMATION ===================== */}
      <SectionHeader title="Device Information" />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InfoCard
            title="Device Info"
            icon={<Cpu size="24" color="#444" />}
            data={payload?.device}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InfoCard
            title="Battery"
            icon={<BatteryCharging size="24" color="#444" />}
            data={payload?.battery}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InfoCard
            title="Network"
            icon={<Global size="24" color="#444" />}
            data={payload?.network}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InfoCard
            title="Wi-Fi"
            icon={<Wifi size="24" color="#444" />}
            data={payload?.wifi}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InfoCard
            title="Location"
            icon={<Map1 size="24" color="#444" />}
            data={payload?.location}
          />
        </Grid>
       
      </Grid>

       <Grid item xs={12} md={12} lg={12}>
          <Box mb={1}>
            <Typography
              variant="h6"
              fontWeight={700}
              display="flex"
              alignItems="center"
            >
              <Map1
                size="24"
                color="#FF647C"
                variant="Bold"
                style={{ marginRight: 8 }}
              />
              Live Location
            </Typography>
          </Box>

          {/* Pass the location object from your API payload */}
          <LocationMap location={payload.location} />
        </Grid>

      {/* ===================== INSTALLED APPS ===================== */}
      <SectionHeader title="Installed Applications" />

      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        sx={{ mb: 3 }}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label={`System Apps (${systemApps?.length})`} value="system" />
        <Tab label={`User Apps (${userApps?.length})`} value="user" />
      </Tabs>

      <Grid container spacing={2}>
        {(tab === "system" ? systemApps : userApps).map((app, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                borderRadius: "18px",
                padding: 1,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "0.25s",
                "&:hover": {
                  transform: "scale(1.04)",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <Gallery size="22" color="#555" />
                  <Typography variant="h6" ml={1} fontSize="1.05rem">
                    {app.appName}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {app.packageName}
                </Typography>

                <Chip
                  label={app.type === "system" ? "System App" : "User App"}
                  size="small"
                  sx={{
                    background:
                      app.type === "system"
                        ? "rgba(0,0,0,0.08)"
                        : "rgba(25,118,210,0.2)",
                    fontWeight: 600,
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Details;
