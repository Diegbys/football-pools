import Layout from "../../src/components/layouts/layout";
import Typography from "@mui/material/Typography";
import CustomButtom from "../../src/components/atoms/customButtom";
import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import { AuthContext } from "../../src/auth/useAuth";

export default function User({ query }) {
  const { user } = React.useContext(AuthContext);
  const [response, setResponse] = React.useState();
  const router = useRouter();
  const dataFetchedRef = React.useRef(false);

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    console.log(router.query);
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
    console.log(response);
  };

  //   const usersList = () => {
  //     if (!user) {
  //       return;
  //     }

  //     if (!response) {
  //       return <Typography>cargando</Typography>;
  //     }

  //     if (!response.success) {
  //       return <Typography>{response.message}</Typography>;
  //     }

  //     return (
  //       <>
  //         {response.users.map((user, index) => (
  //           <div key={index}>
  //             <Typography>
  //               {user.name} {user.points}
  //             </Typography>
  //             <CustomButtom
  //               text="Ver"
  //               action={() => router.push(`user/${user._id}`)}
  //             />
  //             <CustomButtom text="Eliminar" />
  //           </div>
  //         ))}
  //       </>
  //     );
  //   };

  return (
    <Layout title="Inicio de sesión">
      <Container style={{ paddingTop: 50 }}>
        {user && (
          <CustomButtom text="Volver" action={() => router.push("/user")} />
        )}

        {response?.user && (
          <>
            <Typography variant="h4" fontWeight={100}>
              {response.user.name}
            </Typography>
            {response.user.predictions.map((prediction, index) => (
              <>
                <Typography key={index}>
                  {prediction.match.teams[0].name} VS
                  {prediction.match.teams[1].name}
                  {prediction.match.date.slice(0, 10)}
                </Typography>
                <Typography key={index}>
                  Ganador: {prediction.winner?.name}
                </Typography>
              </>
            ))}
          </>
        )}

        {/* {usersList()}
        <CustomButtom
          text="Agregar usuario"
          action={() => router.push("/user/newUser")}
        /> */}
      </Container>
    </Layout>
  );
}
