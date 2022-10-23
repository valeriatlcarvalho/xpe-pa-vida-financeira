import { Link } from "react-router-dom";
import { Link as LinkMUI } from "@mui/material";
import "./styles.css";

function Menu({ routes }) {
  return (
    <>
      {routes.map((route, i) => (
        <LinkMUI
          underline="hover"
          component="button"
          variant="body2"
          key={`${route.routeName}-${i}`}
          sx={{ color: "primary.contrastText", py: 1, px: 2 }}
        >
          <Link to={route.path}>{route.title}</Link>
        </LinkMUI>
      ))}
    </>
  );
}

export { Menu };
