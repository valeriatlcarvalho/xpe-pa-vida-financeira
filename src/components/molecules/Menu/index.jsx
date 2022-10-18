import { Link } from "react-router-dom";
import { Link as LinkMUI } from "@mui/material";
import "./styles.css";

function Menu({ routes }) {
  return (
    <ul>
      {routes.map((route, i) => (
        <LinkMUI
          underline="hover"
          component="button"
          variant="body2"
          key={`${route.routeName}-${i}`}
          style={{ padding: "8px 16px" }}
        >
          <Link to={route.path}>{route.title}</Link>
        </LinkMUI>
      ))}
    </ul>
  );
}

export { Menu };
