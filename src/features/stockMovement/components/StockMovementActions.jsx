import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function StockMovementActions({ movement, onView }) {
  if (!onView) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => onView(movement)}
      title="View stock movement"
      aria-label="View stock movement"
    >
      <Eye className="h-4 w-4" />
    </Button>
  );
}
