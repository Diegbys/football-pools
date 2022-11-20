import Layout from "../../src/components/layouts/layout";
import Typography from "@mui/material/Typography";
import CustomButtom from "../../src/components/atoms/customButtom";
import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import { AuthContext } from "../../src/auth/useAuth";
import { Fetch } from "../../src/utils/fetch";
import CustomCard from "../../src/components/atoms/customCard";
import BackHeader from "../../src/components/organisms/backHeader";
import styles from "../../styles/user.module.css";
import TitleCardMarch from "../../src/components/organisms/titleCardMatch";

export default function MatchIndex() {
  const { user } = React.useContext(AuthContext);
  const [response, setResponse] = React.useState();
  const router = useRouter();
  const dataFetchedRef = React.useRef(false);

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getMatchs();
  }, []);

  const getMatchs = async () => {
    const response = await Fetch("GET", "/api/match");
    setResponse(response);
    console.log(response);
  };

  const matchs = () => {
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
        {response.matches.map((match, index) => (
          <CustomCard key={index} styles={{ marginBottom: 20 }}>
            <TitleCardMarch match={match} />
            <Typography>{match.result ? "se logro" : ""}</Typography>
            <CustomButtom
              text="Seleccionar resultado"
              action={() => router.push(`/match/${match._id}`)}
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
        <Typography variant="h4" fontWeight={100} className={styles.title_user}>
          Partidos
        </Typography>
        {matchs()}
      </Container>
    </Layout>
  );
}
