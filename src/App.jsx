import { Container, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/molecules/Header";
import { Main } from "./components/molecules/Main";
import { Menu } from "./components/molecules/Menu";
import { Pages } from "./components/pages/Pages";
import { theme } from "./configs/theme";
import { APP_ROUTES } from "./services/Routes";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename="/">
          <Container maxWidth="lg">
            <Header>
              <Menu routes={APP_ROUTES} />
            </Header>

            <Main>
              <Pages routes={APP_ROUTES} />
            </Main>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
