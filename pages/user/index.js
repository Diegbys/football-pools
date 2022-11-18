import Layout from "../../src/components/layouts/layout";
import Typography from "@mui/material/Typography";
import CustomButtom from "../../src/components/atoms/customButtom";
import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import { AuthContext } from "../../src/auth/useAuth";

export default function User() {
  const { user, isLogged } = React.useContext(AuthContext);
  const [response, setResponse] = React.useState();
  const router = useRouter();
  const dataFetchedRef = React.useRef(false);

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await fetch("/api/user", {
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
          <div key={index}>
            <Typography>
              {user.name} {user.points}
            </Typography>
            <CustomButtom
              text="Ver"
              action={() => router.push(`user/${user._id}`)}
            />
            <CustomButtom text="Eliminar" />
          </div>
        ))}
      </>
    );
  };

  return (
    <Layout title="Inicio de sesión" deprived>
      <Container style={{ paddingTop: 50 }}>
        <CustomButtom text="Volver" action={() => router.push("/admin/home")} />

        <Typography variant="h4" fontWeight={100}>
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
