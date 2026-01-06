import { useEffect, useState } from "react";
import type { User } from "../../../type/user";
import axios from "axios";
import config from "../../../utils/auth/getToken";
import { Divider } from "@heroui/react";
import TableUsuarios from "./components/TableUsuarios";
import { FaUser } from "react-icons/fa";
import FiltroUsuarios from "./components/FiltroUsuarios";

interface DataFilters {
  search: string | null;
  rol: string | null;
}

const Usuarios = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ususarios, setUsusarios] = useState<User[]>([]);
  const [dataFilters, setDataFilters] = useState<DataFilters>({
    search: "",
    rol: "",
  });
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);

  const findUsuarios = async () => {
    setIsLoading(true);

    const url = `${import.meta.env.VITE_URL_API}/user?search=${
      dataFilters.search
    }&rol=${dataFilters.rol}`;
    await axios
      .get(url, config)
      .then((res) => {
        setUsusarios(res.data.users);
        setPages(res.data.totalPages || 1);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    findUsuarios();
  }, [page]);

  return (
    <main className="w-full h-screen p-3 overflow-hidden">
      <section className="w-full h-full p-4 pb-0 bg-white flex flex-col gap-4 rounded-xl shadow-[0px_0_10px_rgba(255,255,255)]">
        <div className="flex items-end gap-2 font-semibold text-lg text-neutral-700">
          <FaUser className="text-xl text-orange-500" />
          <h1 className="leading-4">Usuarios</h1>
        </div>
        <Divider className="bg-orange-100 h-0.5" />
        <FiltroUsuarios
          setDataFilters={setDataFilters}
          dataFilters={dataFilters}
          findUsuarios={findUsuarios}
        />
        <TableUsuarios
          usuarios={ususarios}
          setPage={setPage}
          page={page}
          isLoading={isLoading}
          pages={pages}
          findUsuarios={findUsuarios}
        />
      </section>
    </main>
  );
};

export default Usuarios;
