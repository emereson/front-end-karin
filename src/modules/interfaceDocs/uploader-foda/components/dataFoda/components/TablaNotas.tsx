"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import type { Nota } from "../../../../../../type/archivo.type";
import { formatCreatedAtDate } from "../../../../../../utils/formatCreatedAtDate";

interface Props {
  notas: Nota[];
}

export default function TablaNotas({ notas }: Props) {
  const columns = [
    { key: "fecha", label: "Fecha" },
    { key: "nota", label: "Nota" },
  ];
  return (
    <Table
      className="py-4 w-full"
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
        {notas?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              {item.createdAt && formatCreatedAtDate(item.createdAt)}
            </TableCell>
            <TableCell>{item.nota}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
