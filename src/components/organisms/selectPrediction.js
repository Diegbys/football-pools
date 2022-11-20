import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import styles from "../../../styles/user.module.css";
import CustomCard from "../atoms/customCard";
import TitleCardMatch from "./titleCardMatch";
import TeamCircle from "../molecules/teamCircle";

export default function SelectPrediction({ predictions, handleWinners }) {
  return (
    <>
      {predictions &&
        predictions.map((prediction, index) => (
          <CustomCard key={index} styles={{ marginBottom: 20 }}>
            <TitleCardMatch match={prediction.match} />
            <Box style={{ display: "flex", justifyContent: "space-around" }}>
              <TeamCircle
                team={prediction.match.teams[0]}
                action={() =>
                  handleWinners(index, prediction.match.teams[0]._id)
                }
                winner={prediction.winner}
              />
              <TeamCircle
                team={prediction.match.teams[1]}
                action={() =>
                  handleWinners(index, prediction.match.teams[1]._id)
                }
                winner={prediction.winner}
              />
              <TeamCircle
                action={() => handleWinners(index, null, true)}
                tie={prediction.tie}
              />
            </Box>
          </CustomCard>
        ))}
    </>
  );
}
