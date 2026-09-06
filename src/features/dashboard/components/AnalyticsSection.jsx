import StockMovementChart from "./StockMovementChart";
import InventoryCategoryChart from "./InventoryCategoryChart";
import StockHealthChart from "./StockHealthChart";
import { ChartColumn } from "lucide-react"

export default function AnalyticsSection({
    stockMovementTrend = [],
    inventoryByCategory = [],
    stockHealth = {},
}) {
    return (
      <section className="space-y-4">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <ChartColumn className="h-5 w-5" />
            Analytics
          </h2>

          <p className="text-sm text-muted-foreground">
            Overview of stock movement, inventory distribution, and stock
            health.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Stock Movement Trend */}
          <StockMovementChart data={stockMovementTrend} />

          {/* Stock Health */}
          <StockHealthChart data={stockHealth} />

          {/* Inventory by Category */}
          <div className="lg:col-span-2">
            <InventoryCategoryChart data={inventoryByCategory} />
          </div>
        </div>
      </section>
    );
};
