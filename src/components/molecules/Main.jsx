import { Paper } from "@mui/material";

function Main({ children }) {
  return (
    <main>
      <Paper
        elevation={0}
        variant="elevation"
        style={{
          padding: "16px",
        }}
      >
        {children}
      </Paper>
    </main>
  );
}

export { Main };
