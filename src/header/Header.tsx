import { Link } from "react-router-dom";
import { BsDoorOpenFill } from "react-icons/bs";
import AccordionListPlan from "./components/AccordionListPlan";
import { Button, Divider } from "@heroui/react";
import { FaUser } from "react-icons/fa";

interface HeaderProps {
  rol: string;
}

const Header = ({ rol }: HeaderProps) => {
  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header
      className="min-w-[290px] max-w-[290px] h-[100vh] pb-6 bg-slate-800 flex flex-col z-30 
             overflow-hidden 
             shadow-[2px_0_6px_rgba(19,20,21)]"
    >
      <Link className="p-4" to="/">
        <img
          className="w-40  m-auto group-hover:opacity-100 duration-300"
          src={"/construcSafe.png"}
          alt=""
        />
      </Link>
      <Divider className="w-[95%] mx-auto bg-white mb-4" />
      <section className="h-full flex flex-col justify-between overflow-hidden">
        <div className="h-full flex flex-col overflow-y-auto">
          <AccordionListPlan />
          {rol === "ADMIN" && (
            <Link className="px-1 py-1" to="/usuarios">
              <Button
                className="w-full rounded-sm flex justify-start px-3 py-5.5 text-xs bg-sky-400"
                radius="none"
              >
                <FaUser className="text-lg" />
                USUARIOS
              </Button>
            </Link>
          )}
        </div>

        <div className="w-full pt-6">
          <Button
            className="w-[97%] m-auto rounded-sm flex justify-start px-3 py-5.5 text-xs bg-red-500"
            radius="none"
            onPress={logOut}
          >
            <BsDoorOpenFill className="text-lg" />
            CERRAR SESION
          </Button>
        </div>
      </section>
    </header>
  );
};

export default Header;
