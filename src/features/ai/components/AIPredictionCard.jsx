import {
    BrainCircuit,
    CalendarClock,
    PackageCheck,
    TrendingUp,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AIRiskBadge from "./AIRiskBadge";

const riskRecommendationStyles = {
    CRITICAL: {
        wrapper: "border-red-200 bg-red-50/70",
        title: "text-red-700",
        text: "text-red-900",
    },
    HIGH: {
        wrapper: "border-orange-200 bg-orange-50/70",
        title: "text-orange-700",
        text: "text-orange-900",
    },
    MEDIUM: {
        wrapper: "border-yellow-200 bg-yellow-50/70",
        title: "text-yellow-700",
        text: "text-yellow-900",
    },
    LOW: {
        wrapper: "border-emerald-200 bg-emerald-50/70",
        title: "text-emerald-700",
        text: "text-emerald-900",
    },
    INSUFFICIENT_DATA: {
        wrapper: "border-slate-200 bg-slate-50/70",
        title: "text-slate-600",
        text: "text-slate-800",
    },
};

const fallbackRecommendations = {
    CRITICAL:
        "Stock is critically low. Restock this item immediately to avoid a stockout.",
    HIGH:
        "Stock is expected to reach a low level soon. Consider planning a replenishment order.",
    MEDIUM:
        "Stock levels require monitoring. Consider preparing a replenishment if demand continues.",
    LOW:
        "Stock levels are currently healthy. Continue monitoring inventory demand.",
    INSUFFICIENT_DATA:
        "There is not enough historical data to make a reliable prediction. Continue recording stock movements.",
};

export default function AIPredictionCard({
    prediction,
    compact = false,
}) {
    if (!prediction) return null;

    const days =
        prediction.daysUntilLowStock === null ||
        prediction.daysUntilLowStock === undefined
            ? "No immediate risk"
            : `${prediction.daysUntilLowStock} days`;

    const riskLevel = prediction.riskLevel || "INSUFFICIENT_DATA";

    const recommendation =
        prediction.recommendation ||
        fallbackRecommendations[riskLevel] ||
        fallbackRecommendations.INSUFFICIENT_DATA;

    const recommendationStyle =
        riskRecommendationStyles[riskLevel] ||
        riskRecommendationStyles.INSUFFICIENT_DATA;

    return (
        <Card className="rounded-sm">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <BrainCircuit className="h-5 w-5" />
                            AI Inventory Prediction
                        </CardTitle>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {prediction.itemName} ({prediction.sku})
                        </p>
                    </div>

                    <AIRiskBadge riskLevel={riskLevel} />
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-3">
                    <Metric
                        icon={PackageCheck}
                        label="Current Stock"
                        value={`${prediction.currentStock} ${prediction.unit || ""}`}
                    />

                    <Metric
                        icon={TrendingUp}
                        label="7-Day Predicted Demand"
                        value={`${prediction.predictedDemand7Days} ${prediction.unit || ""}`}
                    />

                    <Metric
                        icon={CalendarClock}
                        label="Estimated Low Stock"
                        value={days}
                    />
                </div>

                {!compact && (
                    <div
                        className={`rounded-md border p-3 ${recommendationStyle.wrapper}`}
                    >
                        <p
                            className={`text-xs font-semibold ${recommendationStyle.title}`}
                        >
                            AI Recommendation
                        </p>

                        <p
                            className={`mt-1 text-sm ${recommendationStyle.text}`}
                        >
                            {recommendation}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function Metric({ icon: Icon, label, value }) {
    return (
        <div className="rounded-md border p-3">
            <div className="flex items-center gap-2 text-muted-foreground">
                <Icon className="h-4 w-4" />
                <span className="text-xs">{label}</span>
            </div>

            <p className="mt-1 text-lg font-semibold">
                {value}
            </p>
        </div>
    );
}
