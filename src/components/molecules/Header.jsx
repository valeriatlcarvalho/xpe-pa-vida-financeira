import { Avatar, Chip } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

function Header({ children }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Chip label="Vida Financeira" />

      {children}

      <Avatar>
        <PersonIcon />
      </Avatar>
    </header>
  );
}

export { Header };
