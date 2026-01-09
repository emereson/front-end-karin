"use client";
import { FaDownload, FaNoteSticky, FaPlus, FaUpload } from "react-icons/fa6";
import { HiDocument } from "react-icons/hi";
import { MdEditNote } from "react-icons/md";
import { useEffect, useState } from "react";
import { Button, useDisclosure } from "@heroui/react";
import ModalAgregarDocumentoFoda from "./components/ModalAgregarDocumentoFoda";
import ModalValidarFoda from "./components/ModalValidarFoda";
import TablaCambiosFoda from "./components/TablaCambiosFoda";
import ModalRechazarFoda from "./components/ModalRechazarFoda";
import TablaNotas from "./components/TablaNotas";
import ModalAgregarNota from "./components/ModalAgregarNota";
import { getFodaId } from "../../services/archivo.service";
import type { Foda } from "../../../../../type/archivo.type";
import { Link } from "react-router-dom";

interface Props {
  selectFoda: Foda;
  fetchFodasAll: () => void;
  id: number;
}

export function DataFoda({ selectFoda, fetchFodasAll, id }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [foda, setFoda] = useState<Foda | null>(null);
  const [selectModal, setSelectModal] = useState("");

  const [selectNav, setSelectNav] = useState<"documento" | "cambios" | "notas">(
    "documento"
  );

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleNavClick = (nav: "documento" | "cambios" | "notas") => {
    setSelectNav(nav);
  };

  const fileUrl = `${import.meta.env.VITE_URL_IMAGE}/${
    selectFoda.documento || ""
  }`;
  const isPdf = selectFoda.documento?.toLowerCase().endsWith(".pdf");
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(
    selectFoda.documento || ""
  );

  useEffect(() => {
    setFoda(null);
    setSelectModal("");
    setSelectNav("documento");
    setPreviewUrl(null);
  }, [id]);

  // 👉 Previsualizar localmente para evitar errores CSP
  useEffect(() => {
    const fetchFile = async () => {
      if (!foda?.documento) {
        setPreviewUrl(null);
        return;
      }

      try {
        const res = await fetch(fileUrl);
        const blob = await res.blob();
        const localUrl = URL.createObjectURL(blob);
        setPreviewUrl(localUrl);
      } catch (err) {
        console.error("Error al cargar el documento:", err);
        setPreviewUrl(null);
      }
    };

    fetchFile();

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [foda?.documento]);

  const handleCargarDocumento = () => {
    setSelectModal("cargar_documento");
    onOpen();
  };

  const handleValidar = () => {
    setSelectModal("validar");
    onOpen();
  };

  const handleRechazar = () => {
    setSelectModal("rechazar");
    onOpen();
  };

  const handleNuevaNota = () => {
    setSelectModal("nueva_nota");
    onOpen();
  };

  useEffect(() => {
    fetchFodas();
  }, [selectFoda.id]);

  const fetchFodas = async () => {
    try {
      const res = await getFodaId(selectFoda.id);

      setFoda(res.foda);
    } catch (error) {
      console.error("Error al obtener archivos:", error);
    }
  };

  return (
    <div className="bg-white border rounded-lg flex flex-col gap-2 shadow-sm shadow-neutral-500">
      {/* Header navegación */}
      <div className="flex items-center justify-between gap-2 text-xs font-bold text-gray-600 p-3 px-4">
        <div className="flex items-center gap-10">
          <button
            className="flex items-center gap-2"
            onClick={() => handleNavClick("documento")}
          >
            <HiDocument className="text-xl" />
            <p>Documento</p>
          </button>

          <button
            className="flex items-center gap-2"
            onClick={() => handleNavClick("cambios")}
          >
            <MdEditNote className="text-xl" />
            <p>Cambios</p>
          </button>

          <button
            className="flex items-center gap-2"
            onClick={() => handleNavClick("notas")}
          >
            <FaNoteSticky className="text-xl" />
            <p>Notas</p>
          </button>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-10">
          <Link
            to={`${import.meta.env.VITE_URL_IMAGE}/${foda && foda.documento}`}
            target="_blank"
          >
            <button className="flex items-center gap-2">
              <FaDownload className="text-xl" />
              <p>Descargar</p>
            </button>
          </Link>
          <button
            className="flex items-center gap-2"
            onClick={handleCargarDocumento}
          >
            <FaUpload className="text-xl" />
            <p>Cargar</p>
          </button>
          <button className="flex items-center gap-2" onClick={handleValidar}>
            <p>Validar</p>
          </button>
          <button className="flex items-center gap-2" onClick={handleRechazar}>
            <p>Rechazar</p>
          </button>
        </div>
      </div>

      {/* Contenido: Documento */}
      {selectNav === "documento" && (
        <div className="p-4">
          {foda && foda.documento && previewUrl ? (
            <div className="w-full h-[80vh] border rounded-lg overflow-hidden bg-gray-100">
              {isPdf ? (
                <iframe
                  src={previewUrl}
                  className="w-full h-full"
                  title="Vista previa PDF"
                />
              ) : isImage ? (
                <img
                  src={previewUrl}
                  alt="Vista previa imagen"
                  className="max-w-full max-h-[80vh] mx-auto object-contain"
                />
              ) : (
                <p className="text-sm text-center text-gray-500 mt-4">
                  No se puede previsualizar este tipo de archivo.
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">
              Aún no se cargó ningún documento.
            </p>
          )}
        </div>
      )}
      {selectNav === "cambios" && foda && (
        <TablaCambiosFoda cambios={foda.cambiosFoda || []} />
      )}

      {selectNav === "notas" && foda && (
        <div className="w-full  p-4 flex flex-col items-end justify-end">
          <Button
            className="bg-[#1a2dbe] my-2 w-min"
            size="sm"
            color="primary"
            onPress={handleNuevaNota}
            startContent={<FaPlus />}
          >
            Nota
          </Button>
          <TablaNotas notas={foda.notas || []} />
        </div>
      )}

      {selectModal === "cargar_documento" && foda && (
        <ModalAgregarDocumentoFoda
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          foda={foda}
          fetchFodas={fetchFodas}
        />
      )}
      {selectModal === "validar" && foda && (
        <ModalValidarFoda
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          foda={foda}
          fetchFodas={fetchFodas}
          fetchFodasAll={fetchFodasAll}
        />
      )}
      {selectModal === "rechazar" && foda && (
        <ModalRechazarFoda
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          foda={foda}
          fetchFodas={fetchFodas}
          fetchFodasAll={fetchFodasAll}
        />
      )}
      {selectModal === "nueva_nota" && foda && (
        <ModalAgregarNota
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          foda={foda}
          fetchFodas={fetchFodas}
        />
      )}
    </div>
  );
}
