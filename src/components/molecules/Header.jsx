import { Avatar, Box, Chip, Container } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

function Header({ children }) {
  return (
    <header>
      <Box sx={{ backgroundColor: "primary.dark" }}>
        <Container maxWidth="lg">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Chip
              label="Vida Financeira"
              sx={{
                color: "primary.contrastText",
                backgroundColor: "primary.light",
                fontWeight: "bold",
              }}
            />

            {children}

            <Avatar
              sx={{
                color: "primary.contrastText",
                backgroundColor: "primary.light",
              }}
            >
              <PersonIcon />
            </Avatar>
          </div>
        </Container>
      </Box>
    </header>
  );
}

export { Header };
