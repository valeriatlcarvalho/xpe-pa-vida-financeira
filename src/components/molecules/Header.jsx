import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Box, Chip, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const RootBrand = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("lg")]: {
    justifyContent: "flex-start",
  },
  [theme.breakpoints.down("lg")]: {
    justifyContent: "center",
  },
}));

const RootMenuContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    margin: 0,
    padding: 0,
  },
  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
    margin: 0,
    padding: 0,
  },
}));

const RootAvatar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("lg")]: {
    justifyContent: "flex-end",
  },
  [theme.breakpoints.down("lg")]: {
    justifyContent: "center",
  },
}));

function Header({ children }) {
  return (
    <header>
      <Box sx={{ backgroundColor: "primary.dark" }}>
        <Container maxWidth="lg">
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              py: 2,
            }}
          >
            <Grid item xs={12} lg={4}>
              <RootBrand>
                <Chip
                  label="Vida Financeira"
                  sx={{
                    backgroundColor: "primary.light",
                    color: "primary.contrastText",
                    fontWeight: "bold",
                  }}
                />
              </RootBrand>
            </Grid>
            <Grid item xs={12} lg={4}>
              <RootMenuContainer>{children}</RootMenuContainer>
            </Grid>
            <Grid item xs={12} lg={4}>
              <RootAvatar>
                <Avatar
                  sx={{
                    color: "primary.contrastText",
                    backgroundColor: "primary.light",
                  }}
                >
                  <PersonIcon />
                </Avatar>
              </RootAvatar>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </header>
  );
}

export { Header };
