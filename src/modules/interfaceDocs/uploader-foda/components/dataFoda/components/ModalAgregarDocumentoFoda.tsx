import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { cargarDocumentoFoda } from "../../../services/archivo.service";
import type { Foda, FormArchivo } from "../../../../../../type/archivo.type";
import { handleAxiosError } from "../../../../../../utils/errorHandler";
import Loading from "../../../../../../hooks/Loading";
import { Link } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  foda: Foda;
  fetchFodas: () => void;
}

export default function ModalAgregarDocumentoFoda({
  isOpen,
  onOpenChange,
  foda,
  fetchFodas,
}: Props) {
  const { register, handleSubmit, reset } = useForm<FormArchivo>();

  const [loading, setLoading] = useState(false);

  // Limpiar campos al cerrar el modal
  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen]);

  const submit = async (data: FormArchivo) => {
    if (!data.documento?.[0]) {
      toast.error("Debes seleccionar un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("documento", data.documento[0]);

    setLoading(true);

    try {
      await cargarDocumentoFoda(formData, foda.id);
      toast.success("El documento se agregó correctamente");
      fetchFodas();
      onOpenChange(false);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      size="md"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-base text-blue-600">
          Agregar documento
        </ModalHeader>
        <ModalBody>
          {loading && <Loading />}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-2">
              <Input
                type="file"
                label="Selecciona su documento"
                labelPlacement="outside"
                radius="sm"
                size="sm"
                {...register("documento")}
                errorMessage="El documento es obligatorio"
              />

              {foda.documento !== "sin documento" && (
                <span className="text-xs text-red-500 font-semibold">
                  Ya existe un documento cargado dale click a descargar
                </span>
              )}
            </div>

            <div className="flex justify-between items-center px-2 gap-3">
              {foda.documento !== "sin documento" && (
                <Link
                  to={`${import.meta.env.VITE_URL_IMAGE}/${foda.documento}`}
                  target="_blank"
                >
                  <Button type="button" size="sm" color="primary">
                    Descargar
                  </Button>
                </Link>
              )}

              <div className="ml-auto flex gap-3">
                <Button
                  color="danger"
                  type="button"
                  size="sm"
                  onPress={() => onOpenChange(false)}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  size="sm"
                  isLoading={loading}
                >
                  Guardar
                </Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
