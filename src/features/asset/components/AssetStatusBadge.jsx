import { Badge } from "@/components/ui/badge";

const ASSET_STATUS_CONFIG = {
  Available: {
    label: "Available",
    className: "bg-green-100 text-green-700 border-green-200",
  },

  Assigned: {
    label: "Assigned",
    className: "bg-sky-100 text-sky-700 border-sky-200",
  },

  Maintenance: {
    label: "Under Maintenance",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },

  Retired: {
    label: "Retired",
    className: "bg-gray-100 text-gray-700 border-gray-200",
  },
};

export default function AssetStatusBadge({ status }) {
  const config = ASSET_STATUS_CONFIG[status];

  if (!config) {
    return <Badge variant="outline">{status}</Badge>;
  }

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
