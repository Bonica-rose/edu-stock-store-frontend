import { Badge } from "@/components/ui/badge";

const PRIORITY_CONFIG = {
    Low: {
        className: "bg-slate-100 text-slate-700 border-slate-200",
    },

    Medium: {
        className: "bg-amber-100 text-amber-700 border-amber-200",
    },

    High: {
        className: "bg-red-100 text-red-700 border-red-200",
    },
};

export default function MaintenancePriorityBadge({ priority }) {
    const config = PRIORITY_CONFIG[priority];

    return (
        <Badge variant="outline" className={config?.className}>
            {priority}
        </Badge>
    );
}
