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
import type { FormArchivo } from "../../../../type/archivo.type";
import { getFormato, postFormato } from "../services/archivo.service";
import { handleAxiosError } from "../../../../utils/errorHandler";
import Loading from "../../../../hooks/Loading";
import { Link } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  id: number;
}

export default function ModalAgregarFormato({
  isOpen,
  onOpenChange,
  id,
}: Props) {
  const { register, handleSubmit, reset } = useForm<FormArchivo>();

  const [loading, setLoading] = useState(false);
  const [materialApoyoFile, setMaterialApoyoFile] = useState<string>("");

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen]);

  // Cargar archivo existente al abrir el modal
  useEffect(() => {
    if (isOpen) {
      fetchArchivos();
    }
  }, [isOpen]);

  const fetchArchivos = async () => {
    try {
      const res = await getFormato(id);
      setMaterialApoyoFile(res.formato?.formato_url || "");
    } catch (error) {
      console.error("Error al obtener archivos:", error);
    }
  };

  const submit = async (data: FormArchivo) => {
    if (!data.formato?.[0]) {
      toast.error("Debes seleccionar un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("formato", data.formato[0]);

    setLoading(true);

    try {
      await postFormato(formData, id);
      toast.success("El archivo se agregó correctamente");
      fetchArchivos();
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
          Agregar Formato
        </ModalHeader>
        <ModalBody>
          {loading && <Loading />}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-2">
              <Input
                isRequired
                type="file"
                label="Selecciona su documento"
                labelPlacement="outside"
                radius="sm"
                size="sm"
                {...register("formato")}
                errorMessage="El documento es obligatorio"
              />

              {materialApoyoFile && (
                <span className="text-xs text-red-500 font-semibold">
                  Ya existe un documento cargado dale click a descargar
                </span>
              )}
            </div>

            <div className="flex justify-between items-center px-2 gap-3">
              {materialApoyoFile && (
                <Link
                  to={`${import.meta.env.VITE_URL_IMAGE}/${materialApoyoFile}`}
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
