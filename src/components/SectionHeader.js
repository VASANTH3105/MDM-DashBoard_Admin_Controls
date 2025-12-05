import { Box, Typography, Divider } from "@mui/material";

const SectionHeader = ({ title }) => {
  return (
    <Box mb={2} mt={4}>
      <Typography variant="h5" fontWeight={700} mb={1}>
        {title}
      </Typography>
      <Divider sx={{ borderColor: "rgba(0,0,0,0.15)" }} />
    </Box>
  );
};

export default SectionHeader;
