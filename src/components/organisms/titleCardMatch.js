import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

export default function TitleCardMatch({ match }) {
  return (
    <Typography
      variant="h5"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box
          component="img"
          src="https://d18bee67u93fo2.cloudfront.net/Img/Flags/Catar.png"
          style={{ width: 30, marginRight: 10 }}
        />
        <span style={{ marginRight: 10 }}>{match.teams[0].name} VS</span>
        <Box
          component="img"
          src="https://d18bee67u93fo2.cloudfront.net/Img/Flags/Catar.png"
          style={{ width: 30, marginRight: 10 }}
        />
        {match.teams[1].name}
      </div>
      {match.date.slice(0, 10)}
    </Typography>
  );
}
