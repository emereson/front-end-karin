import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { FaCircleCheck, FaPlus, FaUpload } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { MdDangerous } from "react-icons/md";
import { FaCalendarTimes } from "react-icons/fa";
import { Button, useDisclosure } from "@heroui/react";
import ModalAgregarMaterialApoyo from "./components/ModalAgregarMaterialApoyo";
import ModalAgregarFormato from "./components/ModalAgregarFormato";
import ModalAgregarFoda from "./components/ModalAgregarFoda";
import { getFoda } from "./services/archivo.service";
import TablaFoda from "./components/TablaFoda";
import ModalEliminarFoda from "./components/ModalEliminarFoda";
import { DataFoda } from "./components/dataFoda/dataFoda";
import type { Foda } from "../../../type/archivo.type";
import type { InterfaceDocProp } from "../../../type/interfaceDoc";

interface Props {
  id: number;
  interfaceDoc: InterfaceDocProp;
}

export default function FileUploaderFODA({ id, interfaceDoc }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectModal, setSelectModal] = useState("");
  const [fodas, setFodas] = useState<Foda[]>([]);
  const [selectFoda, setSelectFoda] = useState<Foda | null>();

  const handleAgregarMaterialApoyo = () => {
    setSelectModal("material_apoyo");
    onOpen();
  };

  const handleAgregarFormato = () => {
    setSelectModal("formato");
    onOpen();
  };

  const handleAgregarFoda = () => {
    setSelectModal("foda");
    onOpen();
  };

  const fetchFodas = async () => {
    try {
      const res = await getFoda(id);
      setFodas(res.fodas || []);
    } catch (error) {
      console.error("Error al obtener archivos:", error);
    }
  };

  useEffect(() => {
    fetchFodas();
  }, [id]);

  return (
    <div className="w-full min-h-screen bg-neutral-50 p-4  font-sans flex flex-col   h-auto overflow-y-auto">
      {/* Encabezado */}
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-lg font-bold text-gray-800">
          {interfaceDoc.nombre_interface}
        </h1>
        <p className="text-xs">
          TIPO DE DOCUMENTOS (
          {interfaceDoc.tipos_documento.map((i, index) => (
            <span key={index}>{i}, </span>
          ))}
          )
        </p>
      </div>
      {/* Barra de herramientas principal */}
      <div className="flex-shrink-0 flex flex-wrap items-center gap-2 border-y py-2 mb-4">
        <button className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
          Doc. Entrante
        </button>
        <button className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border rounded-md hover:bg-gray-100">
          Doc. Saliente
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        <button
          className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-2"
          onClick={handleAgregarFormato}
        >
          <Download size={16} /> FORMATO
        </button>
        <button
          className="px-3 py-1.5 text-xs font-semibold text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 flex items-center gap-2"
          onClick={handleAgregarMaterialApoyo}
        >
          <Download size={16} /> MATERIAL DE APOYO
        </button>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-8 px-4 text-xl">
          <FaUpload className="text-blue-700" />
          <IoIosWarning className="text-amber-400 text-2xl" />
          <MdDangerous className="text-amber-600 text-2 xl" />
          <FaCircleCheck className="text-green-700" />
          <FaCalendarTimes className="text-red-600" />
        </div>
        <Button
          className="bg-[#1a2dbe] text-xs"
          size="sm"
          color="primary"
          onPress={handleAgregarFoda}
          startContent={<FaPlus />}
        >
          Data
        </Button>
      </div>

      <TablaFoda
        fodas={fodas}
        onOpenChange={onOpenChange}
        setSelectFoda={setSelectFoda}
        setSelectModal={setSelectModal}
      />

      {selectFoda && (
        <DataFoda selectFoda={selectFoda} fetchFodasAll={fetchFodas} id={id} />
      )}

      {selectModal === "material_apoyo" && (
        <ModalAgregarMaterialApoyo
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          id={id}
        />
      )}
      {selectModal === "formato" && (
        <ModalAgregarFormato
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          id={id}
        />
      )}
      {selectModal === "foda" && (
        <ModalAgregarFoda
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          fetchFodas={fetchFodas}
          id={id}
          interfaceDoc={interfaceDoc}
        />
      )}
      {selectModal === "eliminar" && selectFoda && (
        <ModalEliminarFoda
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          selectFoda={selectFoda}
          fetchFodas={fetchFodas}
        />
      )}
    </div>
  );
}
