import { Alert } from "@mui/material";

export function Alerts({ message, severity, onClose }) {
  return <Alert severity={severity} onClose={onClose}>{message}</Alert>;
}
