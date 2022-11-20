import Layout from "../../src/components/layouts/layout";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import BackHeader from "../../src/components/organisms/backHeader";
import CustomCard from "../../src/components/atoms/customCard";
import TitleCardMatch from "../../src/components/organisms/titleCardMatch";
import TeamCircle from "../../src/components/molecules/teamCircle";
import { Fetch } from "../../src/utils/fetch";
import styles from "../../styles/user.module.css";
import CustomButtom from "../../src/components/atoms/customButtom";
import { AuthContext } from "../../src/auth/useAuth";

export default function Match() {
  const [response, setResponse] = React.useState();
  const router = useRouter();
  const dataFetchedRef = React.useRef(false);
  const [selected, setSelected] = React.useState("");
  const [tie, setTie] = React.useState("");
  const { setOpenDialog, setDialog, setLoading } = useContext(AuthContext);

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getMatch();
  }, []);

  const getMatch = async () => {
    const response = await Fetch("GET", `/api/match/${router.query.id}`);
    setResponse(response);
  };

  const handleSelect = (selected, tie = false) => {
    if (tie) {
      setSelected("");
      setTie(true);
    } else {
      setSelected(selected);
      setTie(false);
    }
  };

  const dialogSetting = (message) => {
    setOpenDialog(true);
    setDialog({
      error: true,
      title: "Error",
      description: message,
    });
  };

  const handleSubmit = async () => {
    if (selected === "" && !tie) {
      dialogSetting("Debe elegir un resultado");
      return;
    }
    setLoading(true);

    const response = await Fetch(
      "PUT",
      `/api/match/${router.query.id}`,
      JSON.stringify({ selected, tie })
    );

    if (!response.success) {
      dialogSetting("Ha ocurrido un error");
      return;
    }

    // router.push("/match");
    setLoading(false);
  };

  return (
    <Layout title="Inicio de sesión" deprived>
      <Container style={{ paddingTop: 50 }}>
        <BackHeader urlback="/match" />

        {response?.match && (
          <>
            <TitleCardMatch match={response.match} />
            <Typography variant="h5" style={{ marginBottom: 20 }}>
              Seleccione resultado:
            </Typography>
            <CustomCard className={styles.select_result_container}>
              <TeamCircle
                team={response.match.teams[0]}
                action={() => handleSelect(response.match.teams[0]._id)}
                winner={selected}
              />
              <TeamCircle
                team={response.match.teams[1]}
                action={() => handleSelect(response.match.teams[1]._id)}
                winner={selected}
              />
              <TeamCircle tie={tie} action={() => handleSelect(null, true)} />
            </CustomCard>
            <CustomButtom
              text="Enviar resultado"
              action={() => handleSubmit()}
            />
          </>
        )}
      </Container>
    </Layout>
  );
}
