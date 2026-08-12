import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function TablePagination({ pagination, onPageChange }) {
  if (!pagination) return null;

  const {
    page = 1,
    totalPages = 0,
    total = 0,
    totalItems,
    limit = 10,
  } = pagination;

  // Support both API formats:
  // total and totalItems
  const totalCount = totalItems ?? total;

  // For UI, an empty result still has page 1
  const displayTotalPages = Math.max(totalPages, 1);

  const start = totalCount === 0 ? 0 : (page - 1) * limit + 1;

  const end = totalCount === 0 ? 0 : Math.min(page * limit, totalCount);

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Showing {start}–{end} of {totalCount} entries
      </span>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span className="text-sm">
          Page {page} of {displayTotalPages}
        </span>

        <Button
          variant="outline"
          size="icon"
          disabled={page >= displayTotalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
