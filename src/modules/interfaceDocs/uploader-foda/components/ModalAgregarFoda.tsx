import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { postFoda } from "../services/archivo.service";
import type { FormFoda } from "../../../../type/archivo.type";
import { handleAxiosError } from "../../../../utils/errorHandler";
import Loading from "../../../../hooks/Loading";
import {
  inputClassNames,
  selectClassNames,
} from "../../../../utils/classNames";
import type { InterfaceDocProp } from "../../../../type/interfaceDoc";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  fetchFodas: () => void;
  id: number;
  interfaceDoc: InterfaceDocProp;
}

export default function ModalAgregarFoda({
  isOpen,
  onOpenChange,
  fetchFodas,
  id,
  interfaceDoc,
}: Props) {
  const { register, handleSubmit, reset } = useForm<FormFoda>();

  const [loading, setLoading] = useState(false);

  // Limpiar campos al cerrar el modal
  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen]);

  const submit = async (data: FormFoda) => {
    setLoading(true);

    try {
      await postFoda(data, id);
      toast.success("El dato se agregó correctamente");
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
      size="xl"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-base text-blue-600 ">
          Agregar nuevo dato
        </ModalHeader>
        <ModalBody>
          {loading && <Loading />}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Input
                classNames={inputClassNames}
                placeholder="..."
                variant="bordered"
                color="primary"
                isRequired
                type="text"
                label="Empresa Colaboradora"
                labelPlacement="outside"
                radius="sm"
                size="sm"
                {...register("colaboradora")}
                errorMessage="La empresa es obligatoria"
              />

              <Input
                classNames={inputClassNames}
                placeholder="..."
                variant="bordered"
                color="primary"
                isRequired
                type="text"
                label="Nivel"
                labelPlacement="outside"
                radius="sm"
                size="sm"
                {...register("nivel")}
                errorMessage="El nivel es obligatorio"
              />

              <Input
                classNames={inputClassNames}
                placeholder="..."
                variant="bordered"
                color="primary"
                isRequired
                type="text"
                label="Detalle"
                labelPlacement="outside"
                radius="sm"
                size="sm"
                {...register("detalle")}
                errorMessage="El detalle es obligatorio"
              />

              <Input
                classNames={inputClassNames}
                placeholder="..."
                variant="bordered"
                color="primary"
                isRequired
                type="text"
                label="¿Caduca?"
                labelPlacement="outside"
                radius="sm"
                size="sm"
                {...register("caduca")}
                errorMessage="Este campo es obligatorio"
              />

              <Input
                classNames={inputClassNames}
                placeholder="..."
                variant="bordered"
                color="primary"
                isRequired
                type="date"
                label="Fecha de Ingreso"
                labelPlacement="outside"
                radius="sm"
                size="sm"
                {...register("fecha_ingreso")}
                errorMessage="La fecha es obligatoria"
              />
            </div>
            <Select
              className=""
              classNames={selectClassNames}
              labelPlacement="outside"
              variant="bordered"
              label="Roles"
              {...register("tipo_documento")}
              placeholder="Seleccionar..."
              radius="sm"
              size="sm"
            >
              {interfaceDoc.tipos_documento.map((i) => (
                <SelectItem key={i} textValue={i}>
                  <p className="text-[12px]">{i}</p>
                </SelectItem>
              ))}
            </Select>

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
