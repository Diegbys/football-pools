import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { useTheme } from "@mui/material/styles";

export default function TeamCircle({ team, action, winner, tie }) {
  const theme = useTheme();
  const getBorderColor = () => {
    if (!team && tie) {
      return theme.palette.success.main;
    }

    if (!team && !tie) {
      return theme.palette.secondary.main;
    }

    if (action && winner !== team?._id) {
      return theme.palette.secondary.main;
    }

    if (!action) {
      return theme.palette.primary.main;
    }

    return theme.palette.success.main;
  };

  return (
    <Box
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        style={{
          borderWidth: 2,
          borderColor: getBorderColor(),
          borderRadius: "100%",
          width: 60,
          height: 60,
          display: "flex",
          justifyContent: "center",
          borderStyle: "solid",
          alignItems: "center",
          cursor: 'pointer'
        }}
        onClick={action}
      >
        <Box
          component="img"
          src="https://d18bee67u93fo2.cloudfront.net/Img/Flags/Catar.png"
          style={{ width: 30 }}
        />
      </Box>
      <Typography variant="h5" style={{ color: getBorderColor() }}>
        {team ? team.name : "Empate"}
      </Typography>
    </Box>
  );
}
