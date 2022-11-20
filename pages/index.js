import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import CircleButton from "../src/components/atoms/circleButton";
import User from "../src/models/User";
import dbConnect from "../src/utils/dbConnect";
import { getUsers } from "../src/utils/service";
import styles from "../styles/Home.module.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useRouter } from "next/router";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function Home({ users, error }) {
  const [response, setResponse] = React.useState();
  const dataFetchedRef = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    gettingUsers();
  }, []);

  const gettingUsers = async () => {
    setResponse(await getUsers());
  };

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <Container className={styles.principal_container}>
      {!error ? (
        <Box className={styles.table_container}>
          <Box component="img" src="/logo_qatar.jpeg" style={{ width: 200 }} />
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell>Posición</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Puntos acumulados</TableCell>
                  <TableCell align="center">Ver predicciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {JSON.parse(users).map((user, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.points}</TableCell>
                    <TableCell align="center">
                      <CircleButton
                        icon={
                          <RemoveRedEyeIcon
                            style={{ color: "white", width: 15, height: 15 }}
                          />
                        }
                        action={() => router.push(`user/${user._id}`)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box className={styles.error_container}>
          <Typography variant="h2">Ha oucrrido un error</Typography>
        </Box>
      )}
    </Container>
  );
}

export async function getServerSideProps() {
  try {
    await dbConnect();

    const users = await User.find({ rol: 2 }).sort({ points: -1 });
    return {
      props: {
        users: JSON.stringify(users),
      },
    };
  } catch (error) {
    console.log(error);
    return { props: { error: true } };
  }
}
