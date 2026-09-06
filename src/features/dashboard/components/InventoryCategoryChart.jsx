import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function InventoryCategoryChart({ data = [] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Inventory by Category</CardTitle>
        </CardHeader>

        <CardContent>
            {data.length === 0 ? (
                <div className="flex h-75 items-center justify-center text-sm text-muted-foreground">
                    No inventory category data available.
                </div>
            ) : (
                <div className="h-75 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{
                                top: 10,
                                right: 20,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                horizontal={false}
                            />

                            <XAxis
                                type="number"
                                allowDecimals={false}
                                tickLine={false}
                                axisLine={false}
                            />

                            <YAxis
                                type="category"
                                dataKey="category"
                                width={100}
                                tickLine={false}
                                axisLine={false}
                            />

                            <Tooltip />

                            <Bar
                                dataKey="quantity"
                                name="Stock Quantity"
                                radius={[0, 4, 4, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </CardContent>
    </Card>
    );
};
