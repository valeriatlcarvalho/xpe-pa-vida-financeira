import { Box } from "@mui/material";
import MUICircularProgress from "@mui/material/CircularProgress";

export function CircularProgress() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", fontSize: 4 }} maxWidth="100%">
      <MUICircularProgress />
    </Box>
  );
}
