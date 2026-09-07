import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STOCK_HEALTH_COLORS = {
    Healthy: "oklch(0.70 0.17 155)",
    "Low Stock": "oklch(0.72 0.18 75)",
    "Out of Stock": "oklch(0.66 0.19 25)",
};

export default function StockHealthChart({ data = {} }) {
    const chartData = [
        {
            name: "Healthy",
            value: data.healthy ?? 0,
        },
        {
            name: "Low Stock",
            value: data.lowStock ?? 0,
        },
        {
            name: "Out of Stock",
            value: data.outOfStock ?? 0,
        },
    ];

    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Stock Health</CardTitle>
            </CardHeader>

            <CardContent>
                {total === 0 ? (
                    <div className="flex h-75 items-center justify-center text-sm text-muted-foreground">
                        No stock health data available.
                    </div>
                ) : (
                    <div className="h-75 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={2}
                                    stroke="none"
                                    label
                                >
                                    {chartData.map((entry) => (
                                        <Cell
                                            key={entry.name}
                                            fill={STOCK_HEALTH_COLORS[entry.name]}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "var(--background)",
                                        color: "var(--foreground)",
                                        border: "1px solid var(--border)",
                                        borderRadius: "var(--radius)",
                                        padding: "3px 12px",
                                    }}
                                />

                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}