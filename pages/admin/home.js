import Layout from "../../src/components/layouts/layout";
import Typography from "@mui/material/Typography";
import CustomCard from "../../src/components/atoms/customCard";
import styles from "../../styles/Login.module.css";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import { AuthContext } from "../../src/auth/useAuth";
import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

export default function AdminHome() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const cardOption = (url, icon, text) => {
    return (
      <CustomCard
        onClick={() => router.push(url)}
        className={styles.options_card}
      >
        {icon}
        <Typography variant="h5" style={{ marginRight: 30 }}>
          {text}
        </Typography>
        <KeyboardDoubleArrowRightIcon
          color="secondary"
          className={styles.option_icon}
        />
      </CustomCard>
    );
  };

  return (
    <Layout title="Inicio de sesión" deprived>
      {user && (
        <Container style={{ paddingTop: 50 }}>
          <Box
            component="img"
            src="/backgroun_qatar.png"
            height={200}
            className={styles.background_image}
          />
          <Typography
            variant="h4"
            fontWeight={100}
            style={{ marginBottom: 20 }}
          >
            Bienvenido {user.name}
          </Typography>

          {cardOption(
            "/user",
            <AccountCircleIcon
              color="primary"
              className={styles.option_icon}
            />,
            "Ver usuarios"
          )}

          {cardOption(
            "/match",
            <SportsSoccerIcon color="primary" className={styles.option_icon} />,
            "Ver juegos"
          )}
        </Container>
      )}
    </Layout>
  );
}
