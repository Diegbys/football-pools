import Layout from "../../src/components/layouts/layout";
import Typography from "@mui/material/Typography";
import CustomButtom from "../../src/components/atoms/customButtom";
import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import { AuthContext } from "../../src/auth/useAuth";
import BackHeader from "../../src/components/organisms/backHeader";
import CustomCard from "../../src/components/atoms/customCard";
import { Box } from "@mui/material";
import CircleButton from "../../src/components/atoms/circleButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import styles from "../../styles/user.module.css";
import { getUsers } from "../../src/utils/service";

export default function User() {
  const { user } = React.useContext(AuthContext);
  const [response, setResponse] = React.useState();
  const router = useRouter();
  const dataFetchedRef = React.useRef(false);

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    gettingUsers();
  }, []);

  const gettingUsers = async () => {
    setResponse(await getUsers());
  };

  const usersList = () => {
    if (!user) {
      return;
    }

    if (!response) {
      return <Typography>cargando</Typography>;
    }

    if (!response.success) {
      return <Typography>{response.message}</Typography>;
    }

    return (
      <>
        {response.users.map((user, index) => (
          <CustomCard key={index} className={styles.user_card_container}>
            <Box>
              <Typography className={styles.user_card_name}>
                <b>Nombre</b>: {user.name}. <b>Puntos:</b> {user.points}
              </Typography>
            </Box>
            <CircleButton
              icon={<RemoveRedEyeIcon style={{ color: "white" }} />}
              action={() => router.push(`user/${user._id}`)}
            />
          </CustomCard>
        ))}
      </>
    );
  };

  return (
    <Layout title="Inicio de sesión" deprived>
      <Container style={{ paddingTop: 50 }}>
        <BackHeader urlback="/admin/home" />

        <Typography variant="h4" className={styles.title_user}>
          Usuarios
        </Typography>
        {usersList()}
        <CustomButtom
          text="Agregar usuario"
          action={() => router.push("/user/newUser")}
        />
      </Container>
    </Layout>
  );
}
