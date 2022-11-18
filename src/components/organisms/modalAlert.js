import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useTheme } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ModalAlert({ setOpenDialog, openDialog, dialog }) {
  const theme = useTheme();

  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <div style={{ display: "flex", alignItems: "center", minWidth: 400 }}>
        <DialogTitle>{dialog.title}</DialogTitle>
        {dialog.error ? (
          <CancelIcon style={{ color: theme.palette.error.main }} />
        ) : (
          <CheckCircleIcon style={{ color: theme.palette.success.main }} />
        )}
      </div>

      <DialogContent>
        <DialogContentText>{dialog.description}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
