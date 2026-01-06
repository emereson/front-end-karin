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

import { postFodaNota } from "../../../services/archivo.service";
import type { Foda, Nota } from "../../../../../../type/archivo.type";
import { handleAxiosError } from "../../../../../../utils/errorHandler";
import Loading from "../../../../../../hooks/Loading";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  foda: Foda;
  fetchFodas: () => void;
}

export default function ModalAgregarNota({
  isOpen,
  onOpenChange,
  foda,
  fetchFodas,
}: Props) {
  const { register, handleSubmit, reset } = useForm<Nota>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen]);

  const submit = async (data: Nota) => {
    setLoading(true);

    try {
      await postFodaNota(data, foda.id);
      toast.success("La nota se agregó correctamente");
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
          Nueva Nota
        </ModalHeader>
        <ModalBody>
          {loading && <Loading />}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-2">
              <Textarea
                isRequired
                type="text"
                label="Nota"
                labelPlacement="outside"
                radius="sm"
                size="sm"
                color="primary"
                variant="bordered"
                {...register("nota")}
                errorMessage="La nota es obligatorio"
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
