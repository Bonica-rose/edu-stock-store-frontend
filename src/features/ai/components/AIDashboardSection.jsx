import { BrainCircuit, RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/shared/components/Loader";

import { fetchDashboardAIPredictions } from "../redux/aiThunks";
import AIPredictionCard from "./AIPredictionCard";

export default function AIDashboardSection() {
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector(
        (state) => state.ai.dashboard,
    );

    if (loading && !data) {
        return (
            <Card className="rounded-sm">
                <CardContent className="flex min-h-40 items-center justify-center">
                    <Loader />
                </CardContent>
            </Card>
        );
    }

    if (error && !data) {
        return (
            <Card className="rounded-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <BrainCircuit className="h-5 w-5" />
                        AI Inventory Insights
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-sm text-destructive">{error}</p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                dispatch(fetchDashboardAIPredictions())
                            }
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Retry
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const predictions = data?.predictions || [];

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <BrainCircuit className="h-5 w-5" />
                        AI Inventory Insights
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Forecast-based stock risk for your branch.
                    </p>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    disabled={loading}
                    onClick={() => dispatch(fetchDashboardAIPredictions())}
                >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                </Button>
            </div>

            {predictions.length === 0 ? (
                <Card className="rounded-sm">
                    <CardContent className="py-8 text-center text-sm text-muted-foreground">
                        No inventory prediction data is currently available.
                        Add stock movement history to improve forecasting.
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 lg:grid-cols-2">
                    {predictions.map((prediction) => (
                        <AIPredictionCard
                            key={prediction.inventoryId}
                            prediction={prediction}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
