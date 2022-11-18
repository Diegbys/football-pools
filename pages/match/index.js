import Layout from "../../src/components/layouts/layout";
import Typography from "@mui/material/Typography";
import CustomButtom from "../../src/components/atoms/customButtom";
import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import { AuthContext } from "../../src/auth/useAuth";
import { Fetch } from "../../src/utils/fetch";
import CustomCard from "../../src/components/atoms/customCard";
import moment from "moment";

export default function MatchIndex() {
  const { user, isLogged } = React.useContext(AuthContext);
  const [response, setResponse] = React.useState();
  const router = useRouter();
  const dataFetchedRef = React.useRef(false);
  moment.locale("en");

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
          <CustomCard key={index}>
            <Typography>
              {match.teams[0].name} VS {match.teams[1].name}{" "}
              {match.date.slice(0, 10)}
            </Typography>
            <Typography>{match.result ? "se logro" : ""}</Typography>
            <CustomButtom text="Seleccionar resultado" />
          </CustomCard>
        ))}
      </>
    );
  };

  return (
    <Layout title="Inicio de sesión" deprived>
      <Container style={{ paddingTop: 50 }}>
        <CustomButtom text="Volver" action={() => router.push("/admin/home")} />

        <Typography variant="h4" fontWeight={100}>
          Partidos
        </Typography>
        {matchs()}
      </Container>
    </Layout>
  );
}
