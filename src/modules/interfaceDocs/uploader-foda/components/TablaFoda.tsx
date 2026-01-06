import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { FaCircleCheck, FaTrash, FaUpload } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { MdDangerous } from "react-icons/md";
import { FaCalendarTimes } from "react-icons/fa";
import type { Foda } from "../../../../type/archivo.type";
import { formatDate } from "../../../../utils/formatDate";

interface Props {
  fodas: Foda[];
  onOpenChange: (open: boolean) => void;
  setSelectFoda: (foda: Foda) => void;
  setSelectModal: (foda: string) => void;
}

export default function TablaFoda({
  fodas,
  onOpenChange,
  setSelectFoda,
  setSelectModal,
}: Props) {
  const columns = [
    { key: "estado", label: "Estado" },
    { key: "empresa", label: "E. Colaboradora" },
    { key: "documento", label: "Documento" },
    { key: "nivel", label: "Nivel" },
    { key: "detalle", label: "Detalle" },
    { key: "caduca", label: "Caduca" },
    { key: "fechaIngreso", label: "Fecha Ingreso" },
    { key: "acciones", label: "" },
  ];

  const handleDeleteFoda = (foda: Foda) => {
    setSelectFoda(foda);
    setSelectModal("eliminar");
    onOpenChange(true);
  };

  const isCreatedBeforeIngreso = (foda: Foda): boolean => {
    if (!foda.cambiosFoda || foda.cambiosFoda.length === 0) return false;

    // Obtener el último cambio
    const lastCambio = foda.cambiosFoda[foda.cambiosFoda.length - 1];

    if (!lastCambio.createdAt) return false; // 🔒 Evita el error

    const fechaIngreso = new Date(foda.fecha_ingreso);
    const cambioCreatedAt = new Date(lastCambio.createdAt);

    return cambioCreatedAt > fechaIngreso;
  };

  return (
    <Table
      className="py-4"
      aria-label="Example table with dynamic content"
      color="default"
      isStriped
      classNames={{
        base: "min-w-full  max-h-[70vh]  overflow-auto    ",
        wrapper: "p-0",
      }}
      radius="sm"
      isCompact={true}
      isHeaderSticky
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            className="uppercase text-[11px] font-bold text-white  bg-[#1a2dbe]"
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {fodas?.map((item) => (
          <TableRow key={item.id} onClick={() => setSelectFoda(item)}>
            <TableCell>
              {item.estado === "sin documento" ? (
                <FaUpload className="text-blue-700  text-xl" />
              ) : isCreatedBeforeIngreso(item) ? (
                <FaCalendarTimes className="text-red-600 text-xl" />
              ) : item.estado === "pendiente" ? (
                <IoIosWarning className="text-amber-400 text-2xl" />
              ) : item.estado === "rechazado" ? (
                <MdDangerous className="text-amber-600 text-xl" />
              ) : item.estado === "rechazado" ? (
                <MdDangerous className="text-amber-600 text-xl" />
              ) : (
                <FaCircleCheck className="text-green-700  text-xl" />
              )}
            </TableCell>
            <TableCell className="text-xs">{item.colaboradora}</TableCell>
            <TableCell className="text-xs">{item.documento}</TableCell>
            <TableCell className="text-xs">{item.nivel}</TableCell>
            <TableCell className="text-xs">{item.detalle}</TableCell>
            <TableCell className="text-xs">{item.caduca}</TableCell>
            <TableCell className="text-xs">
              {formatDate(item.fecha_ingreso)}
            </TableCell>
            <TableCell className="text-xs">
              <FaTrash
                className="text-red-500 cursor-pointer text-lg"
                onClick={() => handleDeleteFoda(item)} // ✅ solo se ejecuta al hacer clic
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
