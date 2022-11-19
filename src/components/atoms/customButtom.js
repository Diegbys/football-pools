import * as React from "react";
import Button from "@mui/material/Button";

export default function CustomButtom({ text, action, className }) {
  return (
    <Button
      variant="outlined"
      onClick={action}
      style={{ borderRadius: 10 }}
      className={className}
    >
      {text}
    </Button>
  );
}
