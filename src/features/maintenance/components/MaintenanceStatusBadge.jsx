import { Badge } from "@/components/ui/badge";

const STATUS_CONFIG = {
    Pending: {
        label: "Pending",
        className: "bg-amber-100 text-amber-700 border-amber-200",
    },

    "In Progress": {
        label: "In Progress",
        className: "bg-blue-100 text-blue-700 border-blue-200",
    },

    Completed: {
        label: "Completed",
        className: "bg-green-100 text-green-700 border-green-200",
    },

    Cancelled: {
        label: "Cancelled",
        className: "bg-slate-100 text-slate-600 border-slate-200",
    },
};

export default function MaintenanceStatusBadge({ status }) {
    const config = STATUS_CONFIG[status];

    if (!config) {
        return <Badge variant="outline">{status}</Badge>;
    }

    return (
        <Badge variant="outline" className={config.className}>
            {config.label}
        </Badge>
    );
}
