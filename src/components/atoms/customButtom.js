import * as React from "react";
import Button from "@mui/material/Button";

export default function CustomButtom({
  text,
  action,
  className,
  variant = "outlined",
  startIcon,
}) {
  return (
    <Button
      startIcon={startIcon}
      variant={variant}
      onClick={action}
      style={{ borderRadius: 10 }}
      className={className}
    >
      {text}
    </Button>
  );
}
