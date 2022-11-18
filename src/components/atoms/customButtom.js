import * as React from "react";
import Button from "@mui/material/Button";

export default function CustomButtom({ text, action }) {
  return (
    <Button variant="outlined" onClick={action}>
      {text}
    </Button>
  );
}
