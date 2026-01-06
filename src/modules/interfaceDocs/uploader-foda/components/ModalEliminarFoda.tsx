import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Foda } from "../../../../type/archivo.type";
import { deleteFoda } from "../services/archivo.service";
import { handleAxiosError } from "../../../../utils/errorHandler";
import Loading from "../../../../hooks/Loading";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectFoda: Foda;
  fetchFodas: () => void;
}

export default function ModalEliminarFoda({
  isOpen,
  onOpenChange,
  selectFoda,
  fetchFodas,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteFoda(selectFoda.id);
      toast.success("El dato se elimino correctamente");
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
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-base text-blue-600">
              Agregar Formato
            </ModalHeader>
            <ModalBody>
              {loading && <Loading />}
              <p>
                ¿Está seguro de que desea eliminar este dato{" "}
                <span className="text-red-500">{selectFoda.colaboradora}</span>{" "}
                ? Esta acción es irreversible y el dato será eliminada
                permanentemente.
              </p>{" "}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="danger" onPress={handleDelete}>
                Eliminar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
