import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const STOCK_HEALTH_COLORS = {
  Healthy: "oklch(0.78 0.12 155)", // Soft green
  "Low Stock": "oklch(0.82 0.13 75)", // Soft orange
  "Out of Stock": "oklch(0.76 0.14 25)", // Soft red
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

    const total = chartData.reduce(
        (sum, item) => sum + item.value,
        0
    );

    console.log(chartData);
    

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
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
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
                                    label
                                >
                                    {chartData.map((entry) => (
                                        <Cell
                                            key={entry.name}
                                            fill={
                                                STOCK_HEALTH_COLORS[
                                                    entry.name
                                                ]
                                            }
                                        />
                                    ))}
                                </Pie>

                                <Tooltip />

                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};