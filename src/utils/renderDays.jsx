import { MenuItem } from "@mui/material";

export function renderListDays(prefix) {
  let days = [
    <MenuItem value={0} disabled selected>
      Selecione...
    </MenuItem>,
  ];

  for (let i = 1; i <= 31; i++) {
    days.push(
      <MenuItem value={i} key={`${prefix}-${i}`}>
        {i}
      </MenuItem>
    );
  }

  return days;
}
