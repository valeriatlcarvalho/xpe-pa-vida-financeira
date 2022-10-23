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
          <Header>
            <Menu routes={APP_ROUTES} />
          </Header>

          <Main>
            <Container maxWidth="lg">
              <Pages routes={APP_ROUTES} />
            </Container>
          </Main>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
