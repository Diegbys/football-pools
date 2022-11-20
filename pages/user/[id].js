import Layout from "../../src/components/layouts/layout";
import Typography from "@mui/material/Typography";
import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import { AuthContext } from "../../src/auth/useAuth";
import BackHeader from "../../src/components/organisms/backHeader";
import CustomCard from "../../src/components/atoms/customCard";
import TitleCardMatch from "../../src/components/organisms/titleCardMatch";
import styles from "../../styles/user.module.css";
import { Box } from "@mui/system";
import TeamCircle from "../../src/components/molecules/teamCircle";
import WinnerResult from "../../src/components/molecules/winnerResult";

export default function User({ query }) {
  const { user } = React.useContext(AuthContext);
  const [response, setResponse] = React.useState();
  const router = useRouter();
  const dataFetchedRef = React.useRef(false);

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getUser();
  }, []);

  const getUser = async () => {
    const response = await fetch(`/api/user/${router.query.id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
    setResponse(response);
  };

  return (
    <Layout title="Inicio de sesión">
      <Container style={{ paddingTop: 50, paddingBottom: 50 }}>
        {user && <BackHeader urlback="/user" />}

        {response?.user && (
          <>
            <Typography variant="h4" className={styles.title_user}>
              {response.user.name}
            </Typography>
            {response.user.predictions.map((prediction, index) => (
              <CustomCard key={index} className={styles.card_predictions}>
                <TitleCardMatch match={prediction.match} />
                <WinnerResult winner={prediction.winner} />
              </CustomCard>
            ))}
          </>
        )}
      </Container>
    </Layout>
  );
}
