import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TableLoading from "./TableLoading";
import TableEmpty from "./TableEmpty";

export default function DataTable({ columns, data, loading = false }) {
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
    },

    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
    
  if (loading) {
    return <TableLoading columns={columns.length} />;
  }  

  return (
    <div className="table-scroll relative w-full min-w-0 rounded-lg border mt-3">
      <Table className="min-w-max">
        <TableHeader className="bg-stone-100 dark:bg-slate-900/40">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="font-medium text-blue-950 dark:text-blue-100"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="font-normal">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableEmpty colSpan={columns.length} message="No data found." />
          )}
        </TableBody>
      </Table>
    </div>
  );
}
