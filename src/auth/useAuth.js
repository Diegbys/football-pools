import { createContext, useState } from "react";
import ModalAlert from "../components/organisms/modalAlert";
import Loader from "../components/atoms/loader";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({ name: "Alfredo Cárdenas" });
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialog, setDialog] = useState({});

  const login = (userCredentials) => setUser(userCredentials);
  const logout = () => setUser(null);
  const isLogged = () => !!user;

  const contextValue = {
    user,
    isLogged,
    login,
    logout,
    dialog,
    setDialog,
    setOpenDialog,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      <Loader open={loading} />
      <ModalAlert
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        dialog={dialog}
      />
    </AuthContext.Provider>
  );
}
