import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function PurchaseActions({ purchase, onView }) {
  if (!onView) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => onView(purchase)}
      title="View purchase"
      aria-label="View purchase"
    >
      <Eye className="h-4 w-4" />
    </Button>
  );
}

