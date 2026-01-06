import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { validarFoda } from "../../../services/archivo.service";
import type { CambiosFoda, Foda } from "../../../../../../type/archivo.type";
import { handleAxiosError } from "../../../../../../utils/errorHandler";
import Loading from "../../../../../../hooks/Loading";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  foda: Foda;
  fetchFodas: () => void;
  fetchFodasAll: () => void;
}

export default function ModalValidarFoda({
  isOpen,
  onOpenChange,
  foda,
  fetchFodas,
  fetchFodasAll,
}: Props) {
  const {
    register,
    handleSubmit,

    reset,
  } = useForm<CambiosFoda>();

  const [loading, setLoading] = useState(false);

  // Limpiar campos al cerrar el modal
  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen]);

  const submit = async (data: CambiosFoda) => {
    setLoading(true);

    try {
      await validarFoda(foda.id, data);
      toast.success("El documento se valido  correctamente");

      fetchFodas();
      fetchFodasAll();
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
          Validar
        </ModalHeader>
        <ModalBody>
          {loading && <Loading />}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-2">
              <Textarea
                isRequired
                type="text"
                label="Comentario para el cambio de estado"
                labelPlacement="outside"
                radius="sm"
                size="sm"
                color="primary"
                variant="bordered"
                {...register("comentario")}
                errorMessage="El comentario es obligatorio"
              />
            </div>

            <div className="flex justify-between items-center px-2 gap-3">
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
                  Validar
                </Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
