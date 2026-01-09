// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./modules/login/Login";
import ProtectedRoutes from "./utils/auth/ProtectedRoutes";
import Header from "./header/Header";
import { Toaster } from "sonner";
import Usuarios from "./modules/usuarios/usuarios/Usuarios";
import DashBoard from "./modules/dashBoard/DashBoard";
import InterfaceDoc from "./modules/interfaceDocs/InterfaceDoc";

const useUserData = () => {
  const userDataJSON = localStorage.getItem("userData");
  const userData = userDataJSON ? JSON.parse(userDataJSON) : null;
  return userData;
};

function App() {
  const userData = useUserData();

  return (
    <BrowserRouter>
      <Toaster position="bottom-right" richColors />
      <div className=" w-screen flex  bg-white  overflow-hidden">
        {userData && <Header rol={userData.role} />}
        <Routes>
          <Route path="/log-in" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            {/* mascotas */}
            <Route path="/" element={<DashBoard />} />
            <Route path="/interface-doc/:id" element={<InterfaceDoc />} />

            {/* usuarios */}
            <Route path="/usuarios" element={<Usuarios />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
