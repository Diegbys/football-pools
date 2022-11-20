import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";

export default function CircleButton({ action, icon }) {
  const theme = useTheme();
  return (
    <IconButton
      color="primary"
      style={{ background: theme.palette.primary.main }}
      onClick={action}
    >
      {icon}
    </IconButton>
  );
}
