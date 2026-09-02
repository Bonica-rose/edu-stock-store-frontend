import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportFilters({
  children,
  onReset,
  hasFilters = false,
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-3">
        {onReset && (
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            disabled={!hasFilters}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}
