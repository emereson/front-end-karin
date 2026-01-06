"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import type { CambiosFoda } from "../../../../../../type/archivo.type";
import { formatCreatedAtDate } from "../../../../../../utils/formatCreatedAtDate";

interface Props {
  cambios: CambiosFoda[];
}

export default function TablaCambiosFoda({ cambios }: Props) {
  const columns = [
    { key: "fecha", label: "Fecha" },
    { key: "estado", label: "Estado" },
    { key: "revisor", label: "Revisor" },
    { key: "comentario", label: "Anotación/ comentario" },
  ];
  return (
    <div className="p-4">
      <Table
        className="py-4"
        aria-label="Example table with dynamic content"
        color="default"
        isStriped
        classNames={{
          base: "min-w-full  max-h-[70vh]  overflow-scroll    ",
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
              className="uppercase text-xs font-bold text-white  bg-[#1a2dbe]"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {cambios?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.createdAt && formatCreatedAtDate(item.createdAt)}
              </TableCell>
              <TableCell>{item.estado}</TableCell>
              <TableCell>{item.revisor}</TableCell>
              <TableCell>{item.comentario}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
