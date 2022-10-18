import { createTheme } from "@mui/material";

const themeOptions = {
  palette: {
    primary: {
      main: "#00967a",
    },
    secondary: {
      main: "#673ab7",
    },
  },
  spacing: 8,
  typography: {
    // fontFamily: "Open Sans",
    fontSize: 16,
  },
};

export const theme = createTheme(themeOptions);
