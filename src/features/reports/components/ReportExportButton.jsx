import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportExportButton({
    onExport,
    exporting = false,
    disabled = false,
    label = "Export",
}) {
    return (
      <Button
        type="button"
        // variant="outline"
        onClick={onExport}
        disabled={disabled || exporting}
        className={`border-green-700 text-green-200 bg-green-700 hover:border-green-600 hover:text-green-100 hover:bg-green-600`}
      >
        <Download className="mr-2 h-4 w-4" />

        {exporting ? "Exporting..." : label}
      </Button>
    );
}
