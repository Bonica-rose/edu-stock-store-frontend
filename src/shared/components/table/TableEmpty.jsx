import { TableCell, TableRow } from "@/components/ui/table";

export default function TableEmpty({ colSpan, message = "No data found." }) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className="h-32 text-center text-muted-foreground"
      >
        {message}
      </TableCell>
    </TableRow>
  );
}
