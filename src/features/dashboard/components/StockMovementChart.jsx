import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StockMovementChart({ data = [] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Stock Movement Trend</CardTitle>
            </CardHeader>

            <CardContent>
                {data.length === 0 ? (
                    <div className="flex h-75 items-center justify-center text-sm text-muted-foreground">
                        No stock movement data available.
                    </div>
                ) : (
                    <div className="h-75 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={data}
                                margin={{
                                    top: 10,
                                    right: 20,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <YAxis
                                    allowDecimals={false}
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <Tooltip />

                                <Legend />

                                <Line
                                    type="monotone"
                                    dataKey="stockIn"
                                    name="Stock In"
                                    strokeWidth={2}
                                    dot={{ r: 3 }}
                                    activeDot={{ r: 5 }}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="stockOut"
                                    name="Stock Out"
                                    strokeWidth={2}
                                    dot={{ r: 3 }}
                                    activeDot={{ r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
