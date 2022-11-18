import Layout from "../../src/components/layouts/layout";
import Typography from "@mui/material/Typography";
import CustomButtom from "../../src/components/atoms/customButtom";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import CustomCard from "../../src/components/atoms/customCard";
import CustomInput from "../../src/components/atoms/customInput";
import { Fetch } from "../../src/utils/fetch";
import { Box } from "@mui/system";
import { AuthContext } from "../../src/auth/useAuth";

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
  const { setOpenDialog, setDialog } = useContext(AuthContext);

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
    console.log(predictions);
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
    }

    const body = JSON.stringify({ name, predictions });
    const response = await Fetch("POST", "/api/user", body);

    if (!response.success) {
      dialogSetting("Ha ocurrido un error");
    }

    router.push("/user");
  };

  return (
    <Layout title="Inicio de sesión" deprived>
      <Container style={{ paddingTop: 50 }}>
        <CustomButtom text="Volver" action={() => router.push("/user")} />

        <Typography variant="h4" fontWeight={100}>
          Agregar nuevo usuario
        </Typography>
        <CustomCard>
          <CustomInput
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Typography variant="h5" fontWeight={100}>
            Seleccione los resultados:
          </Typography>
          {predictions &&
            predictions.map((prediction, index) => (
              <>
                <Typography key={index}>
                  {" "}
                  {prediction.match.teams[0].name} VS{" "}
                  {prediction.match.teams[1].name}{" "}
                  {prediction.match.date.slice(0, 10)}
                </Typography>
                <Box style={{ display: "flex" }}>
                  <Typography
                    onClick={() =>
                      handleWinners(index, prediction.match.teams[0]._id)
                    }
                    style={{
                      margin: 10,
                      color:
                        prediction.match.teams[0]._id === prediction.winner
                          ? "red"
                          : "black",
                    }}
                  >
                    {prediction.match.teams[0].name}
                  </Typography>
                  <Typography
                    onClick={() =>
                      handleWinners(index, prediction.match.teams[1]._id)
                    }
                    style={{
                      margin: 10,
                      color:
                        prediction.match.teams[1]._id === prediction.winner
                          ? "red"
                          : "black",
                    }}
                  >
                    {prediction.match.teams[1].name}
                  </Typography>
                  <Typography
                    onClick={() => handleWinners(index, null, true)}
                    style={{
                      margin: 10,
                      color: prediction.tie ? "red" : "black",
                    }}
                  >
                    Empate
                  </Typography>
                </Box>
              </>
            ))}
        </CustomCard>

        <CustomButtom text="Agregar usuario" action={() => handleSubmit()} />
      </Container>
    </Layout>
  );
}
