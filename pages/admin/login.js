import Layout from "../../src/components/layouts/layout";
import Typography from "@mui/material/Typography";
import CustomCard from "../../src/components/atoms/customCard";
import CustomInput from "../../src/components/atoms/customInput";
import CustomButtom from "../../src/components/atoms/customButtom";
import styles from "../../styles/Login.module.css";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Loader from "../../src/components/atoms/loader";
import ModalAlert from "../../src/components/organisms/modalAlert";
import { AuthContext } from "../../src/auth/useAuth";

export default function Login() {
  const [data, setData] = React.useState({ name: "", password: "" });
  const router = useRouter();
  const { setDialog, setOpenDialog, setLoading, login } =
    useContext(AuthContext);

  const handleInputs = (event) => {
    setData({ ...data, ...{ [event.target.name]: event.target.value } });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
    console.log(response, "esto es", response.success);

    if (!response.success) {
      setDialog({
        error: true,
        title: "Error",
        description: response.message,
      });
      setOpenDialog(true);
      return setLoading(false);
    }

    login(response.user);
    router.push("/admin/home");
    setLoading(false);
  };

  return (
    <Layout title="Inicio de sesión">
      <div className={styles.container}>
        <CustomCard>
          <Typography variant="h5">Inicio de sesión</Typography>
          <CustomInput
            label="Usuario"
            onChange={handleInputs}
            name="name"
            value={data.name}
          />
          <CustomInput
            label="Contraseña"
            onChange={handleInputs}
            type="password"
            name="password"
            value={data.password}
          />
          <CustomButtom text="Iniciar" action={() => handleSubmit()} />
        </CustomCard>
      </div>
    </Layout>
  );
}
