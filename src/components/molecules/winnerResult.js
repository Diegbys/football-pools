import Typography from "@mui/material/Typography";
import React from "react";
import { Box } from "@mui/system";
import TeamCircle from "./teamCircle";

export default function WinnerResult({ winner }) {
  return (
    <Box>
      <Typography variant="h6">{winner ? "Ganador: " : "Empate"}</Typography>
      <TeamCircle team={winner}/>
    </Box>
  );
}
