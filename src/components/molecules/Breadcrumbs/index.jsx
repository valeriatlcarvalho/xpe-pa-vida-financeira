import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Breadcrumbs({ items, ...props }) {
  return (
    <MUIBreadcrumbs aria-label="breadcrumb" {...props}>
      {items.map((item, i) => {
        if (items.length - 1 === i) {
          return (
            <Typography key="last-item" color="text.primary">
              {item.children}
            </Typography>
          );
        } else {
          return (
            <Link
              component={RouterLink}
              underline="hover"
              color="inherit"
              to={item.link}
              key={item.link}
            >
              {item.children}
            </Link>
          );
        }
      })}
    </MUIBreadcrumbs>
  );
}

export { Breadcrumbs };
