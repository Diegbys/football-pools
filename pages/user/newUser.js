import Layout from "../../src/components/layouts/layout";
import Typography from "@mui/material/Typography";
import CustomButtom from "../../src/components/atoms/customButtom";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import CustomCard from "../../src/components/atoms/customCard";
import CustomInput from "../../src/components/atoms/customInput";
import { Fetch } from "../../src/utils/fetch";
import { AuthContext } from "../../src/auth/useAuth";
import BackHeader from "../../src/components/organisms/backHeader";
import styles from "../../styles/user.module.css";
import SelectPrediction from "../../src/components/organisms/selectPrediction";

function useForceUpdate() {
  let [value, setState] = React.useState(true);
  return () => setState(!value);
}

export default function NewUser() {
  const router = useRouter();
  const dataFetchedRef = React.useRef(false);
  const [name, setName] = React.useState("");
  const [predictions, setPredictions] = React.useState();
  const handleForceupdateMethod = useForceUpdate();
  const { setOpenDialog, setDialog, setLoading } = useContext(AuthContext);

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getMatchs();
  }, []);

  const getMatchs = async () => {
    const response = await Fetch("GET", "/api/match");
    console.log(response);
    setPredictions(
      response.matches.map((match) => ({
        match: match,
        winner: "",
        tie: false,
      }))
    );
  };

  const handleWinners = (index, winner, tie = false) => {
    const predictionsToSet = predictions;
    if (tie) {
      predictionsToSet[index].winner = "";
      predictionsToSet[index].tie = true;
    } else {
      predictionsToSet[index].winner = winner;
      predictionsToSet[index].tie = false;
    }

    setPredictions(predictionsToSet);
    handleForceupdateMethod();
  };

  const invalidPredictions = () => {
    for (let index = 0; index < predictions.length; index++) {
      if (predictions[index].winner == "" && !predictions[index].tie) {
        return true;
      }
    }
    return false;
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
    if (!name || invalidPredictions()) {
      dialogSetting("Debe ingresar el nombre y seleccionar los resultados");
      return;
    }

    setLoading(true);

    const body = JSON.stringify({ name, predictions });
    const response = await Fetch("POST", "/api/user", body);

    if (!response.success) {
      dialogSetting("Ha ocurrido un error");
      return;
    }

    router.push("/user");
    setLoading(false);
  };

  return (
    <Layout title="Inicio de sesión" deprived>
      <Container style={{ paddingTop: 50, paddingBottom: 50 }}>
        <BackHeader urlback="/user" />

        <Typography variant="h4" className={styles.title_user}>
          Agregar nuevo usuario
        </Typography>
        <CustomCard styles={{ marginBottom: 20 }}>
          <CustomInput
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </CustomCard>
        <Typography variant="h5" fontWeight={100} className={styles.title_user}>
          Seleccione los resultados:
        </Typography>

        <SelectPrediction
          predictions={predictions}
          handleWinners={handleWinners}
        />

        <CustomButtom text="Agregar usuario" action={() => handleSubmit()} />
      </Container>
    </Layout>
  );
}
