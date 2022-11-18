import Layout from "../../src/components/layouts/layout";
import Typography from "@mui/material/Typography";
import CustomCard from "../../src/components/atoms/customCard";
import CustomInput from "../../src/components/atoms/customInput";
import CustomButtom from "../../src/components/atoms/customButtom";
import styles from "../../styles/Login.module.css";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Loader from "../../src/components/atoms/loader";
import ModalAlert from "../../src/components/organisms/modalAlert";
import Container from "@mui/material/Container";
import { AuthContext } from "../../src/auth/useAuth";

export default function AdminHome() {
  const { user, isLogged } = useContext(AuthContext);
  const router = useRouter();

  console.log(user);

  return (
    <Layout title="Inicio de sesión" deprived>
      {user && (
        <Container style={{ paddingTop: 50 }}>
          <Typography variant="h4" fontWeight={100}>
            Bienvenido {user.name}
          </Typography>

          <CustomCard onClick={() => router.push("/user")}>
            Ver usuarios
          </CustomCard>
          <CustomCard onClick={() => router.push("/match")}>
            Ver juegos
          </CustomCard>
        </Container>
      )}
    </Layout>
  );
}
