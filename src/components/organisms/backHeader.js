import React from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import CustomButtom from "../atoms/customButtom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function BackHeader({ urlback }) {
  const router = useRouter();

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <div>
        <CustomButtom
          text="Volver"
          action={() => router.push(urlback)}
          variant="contained"
          startIcon={<ExitToAppIcon />}
        />
      </div>

      <Box component="img" src="/2022.png" style={{ width: 200 }} />
    </Box>
  );
}
