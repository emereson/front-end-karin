import { Button, Input, Select, SelectItem } from "@heroui/react";
import {
  inputClassNames,
  selectClassNames,
} from "../../../../utils/classNames";
import { RiSearchEyeFill } from "react-icons/ri";
import ModalAddUsuario from "./CrudUsuario/ModalAddUsuario";

interface DataFilters {
  search: string | null;
  rol: string | null;
}

interface Props {
  setDataFilters: (e: DataFilters) => void;
  dataFilters: DataFilters;
  findUsuarios: () => void;
}

const FiltroUsuarios = ({
  setDataFilters,
  dataFilters,
  findUsuarios,
}: Props) => {
  return (
    <section className="w-full  flex items-end gap-1  justify-between ">
      <div className="w-full max-w-3xl flex items-end gap-1 ">
        <Input
          className=""
          classNames={inputClassNames}
          label="Nombre Apellidos - email - celular"
          labelPlacement="outside"
          name="NOMBRE APELLIDOS"
          type="string"
          placeholder="Buscar por Nombre Apellidos - email O celular"
          onChange={(e) =>
            setDataFilters({ ...dataFilters, search: e.target.value || "" })
          }
          value={dataFilters.search || ""}
          radius="sm"
          size="sm"
          id="correoUsuario"
          variant="bordered"
        />
        <Select
          className="min-w-[180px] max-w-[180px]"
          classNames={selectClassNames}
          labelPlacement="outside"
          variant="bordered"
          label="Roles"
          placeholder="Seleccionar..."
          radius="sm"
          size="sm"
          selectedKeys={[dataFilters.rol || ""]}
          onChange={(e) =>
            setDataFilters({ ...dataFilters, rol: e.target.value })
          }
        >
          <>
            <SelectItem key="" textValue="TODOS">
              <p className="text-[12px]">TODOS</p>
            </SelectItem>
            <SelectItem key="ADMIN" textValue="ADMIN">
              <p className="text-[12px]">ADMIN</p>
            </SelectItem>
            <SelectItem key="CLIENTE" textValue="CLIENTE">
              <p className="text-[12px]">CLIENTE</p>
            </SelectItem>
          </>
        </Select>
        <Button
          type="submit"
          className=" bg-[#0356ba] h-9 min-w-[50px]  flex items-center justify-center cursor-pointer hover:bg-[#2776d8] transition-colors"
          onPress={findUsuarios}
          radius="sm"
        >
          <RiSearchEyeFill className="text-xl text-white" />
        </Button>
      </div>
      <ModalAddUsuario findUsuarios={findUsuarios} />
    </section>
  );
};

export default FiltroUsuarios;
