import { Badge } from "@/components/ui/badge";

const variants = {
    CRITICAL: "destructive",
    HIGH: "destructive",
    MEDIUM: "secondary",
    LOW: "active",
};

export default function AIRiskBadge({ riskLevel }) {
    return (
        <Badge variant={variants[riskLevel] || "secondary"}>
            {riskLevel === "INSUFFICIENT_DATA"
                ? "Insufficient Data"
                : riskLevel || "Unknown"}
        </Badge>
    );
}
