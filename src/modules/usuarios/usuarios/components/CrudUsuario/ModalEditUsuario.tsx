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
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import config from "../../../../../utils/auth/getToken";
import Loading from "../../../../../hooks/Loading";
import {
  inputClassNames,
  selectClassNames,
} from "../../../../../utils/classNames";
import type { User } from "../../../../../type/user";
import { onInputNumber } from "../../../../../utils/onInputs";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props {
  usuario: User;
  findUsuarios: () => void;
  isOpen: boolean;
  onOpenChange: (e?: boolean) => void;
}

const ModalEditUsuario = ({
  usuario,
  findUsuarios,
  isOpen,
  onOpenChange,
}: Props) => {
  const { register, handleSubmit, reset } = useForm<User>();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const submit = async (data: User) => {
    setLoading(true);

    const url = `${import.meta.env.VITE_URL_API}/user/${usuario.id}`;
    await axios
      .patch(url, data, config)
      .then(() => {
        toast.success("Usuario editado correctamente");
        findUsuarios();
        reset();
        onOpenChange(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          err?.response?.data?.message || "Hubo un error al editar el usuario"
        );
      })
      .finally(() => setLoading(false));
  };
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      {loading && <Loading />}

      <ModalContent>
        <ModalHeader>Editar Usuario</ModalHeader>
        <ModalBody className="max-h-[80vh] overflow-y-auto">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
            <div className="w-full flex gap-2">
              <Input
                isRequired
                classNames={inputClassNames}
                label="Nombre y Apellidos"
                labelPlacement="outside"
                placeholder="..."
                variant="bordered"
                {...register("nombre")}
                color="primary"
                radius="sm"
                size="sm"
                defaultValue={usuario.nombre}
              />
            </div>

            <div className="w-full flex gap-2">
              <Input
                isRequired
                classNames={inputClassNames}
                label="Correo Electrónico"
                labelPlacement="outside"
                placeholder="..."
                variant="bordered"
                {...register("email")}
                color="primary"
                radius="sm"
                type="email"
                size="sm"
                defaultValue={usuario.email}
              />
              <Input
                isRequired
                classNames={inputClassNames}
                label="Número de teléfono"
                labelPlacement="outside"
                placeholder="..."
                variant="bordered"
                {...register("telefono")}
                maxLength={9}
                minLength={9}
                color="primary"
                radius="sm"
                type="tel"
                size="sm"
                onInput={onInputNumber}
                defaultValue={usuario.telefono}
              />
            </div>
            <div className="w-full flex gap-2">
              <Input
                isRequired
                classNames={inputClassNames}
                label="Fecha de nacimiento"
                labelPlacement="outside"
                placeholder="..."
                variant="bordered"
                {...register("fecha_nacimiento")}
                color="primary"
                radius="sm"
                type="date"
                size="sm"
                defaultValue={usuario.fecha_nacimiento}
              />
              <Select
                isRequired
                classNames={selectClassNames}
                label="Sexo"
                labelPlacement="outside"
                variant="bordered"
                radius="sm"
                placeholder="Seleccione sexo"
                size="sm"
                {...register("sexo")}
                defaultSelectedKeys={[usuario.sexo]}
              >
                <SelectItem key="Masculino" textValue="Masculino">
                  <p className="text-[11px]">Masculino</p>
                </SelectItem>
                <SelectItem key="Femenino" textValue="Femenino">
                  <p className="text-[11px]">Femenino</p>
                </SelectItem>
                <SelectItem key="Otro" textValue="Otros">
                  <p className="text-[11px]">Otro</p>
                </SelectItem>
              </Select>
            </div>
            <div className="w-full flex gap-2">
              <Input
                classNames={inputClassNames}
                label="Nueva Contraseña"
                labelPlacement="outside"
                variant="bordered"
                placeholder="..."
                {...register("newpassword")}
                color="primary"
                radius="sm"
                size="sm"
                id="passwordUsuario"
                type={isVisible ? "text" : "password"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <FaEyeSlash className="text-xl text-blue-600 pointer-events-none flex-shrink-0" />
                    ) : (
                      <FaEye className="text-xl text-blue-600 pointer-events-none flex-shrink-0" />
                    )}
                  </button>
                }
              />
              <Select
                classNames={selectClassNames}
                labelPlacement="outside"
                variant="bordered"
                label="Rol"
                placeholder="Seleccionar..."
                radius="sm"
                size="sm"
                {...register("role")}
                defaultSelectedKeys={usuario.role}
              >
                <>
                  <SelectItem key="ADMIN" textValue="ADMIN">
                    <p className="text-[12px]">ADMIN</p>
                  </SelectItem>
                  <SelectItem key="CLIENTE" textValue="CLIENTE">
                    <p className="text-[12px]">CLIENTE</p>
                  </SelectItem>
                </>
              </Select>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  onOpenChange();
                  reset();
                }}
                size="sm"
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                type="submit"
                isDisabled={loading}
                size="sm"
              >
                Guardar
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditUsuario;
