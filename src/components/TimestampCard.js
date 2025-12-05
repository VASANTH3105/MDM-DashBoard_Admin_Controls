import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { Clock, Timer1, Calendar } from "iconsax-react";

const TimestampCard = ({ utc, ist, readable }) => {
  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: "18px",
        padding: 1,
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Last Data Capture
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <Clock size="24" color="#444" />
            <Box>
              <Chip label="Readable Time" size="small" sx={{ mb: 0.5 }} />
              <Typography fontSize="1.1rem" fontWeight={700}>
                {readable}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Timer1 size="24" color="#555" />
            <Box>
              <Chip label="IST" size="small" sx={{ mb: 0.5 }} />
              <Typography color="#333">{ist}</Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Calendar size="24" color="#666" />
            <Box>
              <Chip label="UTC" size="small" sx={{ mb: 0.5 }} />
              <Typography color="#333">{utc}</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TimestampCard;
