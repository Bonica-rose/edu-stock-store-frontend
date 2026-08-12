import { MoreHorizontal, Pencil, Power, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function CategoryActions({
  category,
  onEdit,
  onStatusChange,
  onDelete,
}) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted">
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(category)}>
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
        )}
        {onStatusChange && (
          <DropdownMenuItem onClick={() => onStatusChange(category)}>
            <Power className="mr-2 h-4 w-4" />
            {category.isActive ? "Deactivate" : "Activate"}
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem
            onClick={() => onDelete(category)}
            className="text-destructive focus:text-destructive"
          >
            {" "}
            <Trash2 className="mr-2 h-4 w-4" /> Delete{" "}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
