import { Card, CardContent, Typography, Box, Grid, Chip } from "@mui/material";

const formatKey = (key) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

const InfoCard = ({ title, icon, data }) => {
  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: "18px",
        padding: 1,
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          {icon}
          <Typography variant="h6" ml={1} fontWeight={700}>
            {title}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {Object.entries(data).map(([key, value]) => (
            <Grid item xs={12} sm={6} key={key}>
              <Typography
                variant="subtitle2"
                sx={{ color: "#666", fontWeight: 600, fontSize: "0.85rem" }}
              >
                {formatKey(key)}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1, fontSize: "1rem" }}>
                {value === null || value === "" ? (
                  <Chip label="Not Available" size="small" />
                ) : typeof value === "boolean" ? (
                  <Chip
                    label={value ? "Yes" : "No"}
                    color={value ? "success" : "error"}
                    size="small"
                  />
                ) : (
                  <strong style={{ color: "#222" }}>{value}</strong>
                )}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
