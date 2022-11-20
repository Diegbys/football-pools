import React, { useContext } from "react";
import Head from "next/head";
import { AuthContext } from "../../auth/useAuth";
import { useRouter } from "next/router";

export default function Layout({ children, title, deprived }) {
  const { isLogged } = useContext(AuthContext);
  const router = useRouter();

  React.useEffect(() => {
    if (deprived && !isLogged()) {
      router.push("/admin/login");
    }
  }, []);

  return (
    <div>
      <Head>
        <link rel="icon" href="/img/logo_white.png" />
        <title>{title} | Quiniela</title>
        <meta name="description" content="Portfolio" />
      </Head>

      <main style={{ height: "100vh" }}>{children}</main>
    </div>
  );
}
