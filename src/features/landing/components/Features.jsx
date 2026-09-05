import { Card, CardContent } from "@/components/ui/card";
import {
  Boxes,
  Laptop,
  ArrowRightLeft,
  Building2,
  Wrench,
  ChartColumn,
} from "lucide-react";

const features = [
  {
    icon: Boxes,
    color: "text-blue-800",
    title: "Inventory",
    description: "Manage stock items and inventory levels.",
  },
  {
    icon: Laptop,
    color: "text-green-800",
    title: "Assets",
    description: "Track institutional assets and assignments.",
  },
  {
    icon: ArrowRightLeft,
    color: "text-blue-500",
    title: "Stock Movement",
    description: "Monitor stock in, out, transfers, and adjustments.",
  },
  {
    icon: Building2,
    color: "text-green-500",
    title: "Branches",
    description: "Support inventory management across branches.",
  },
  {
    icon: Wrench,
    color: "text-indigo-500",
    title: "Maintenance",
    description: "Track maintenance requests and asset servicing.",
  },
  {
    icon: ChartColumn,
    color: "text-orange-500",
    title: "Dashboard",
    description: "View key metrics and reports in one place.",
  },
];

const Features = () => {
  return (
    <Card>
      <CardContent>
        <section id="features" className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Core Features
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <Card
                    key={feature.title}
                    className="rounded-xl p-6 shadow-sm transition hover:shadow-md dark:bg-slate-900"
                  >
                    <Icon className={`mb-4 h-10 w-10 ${feature.color}`} />

                    <h3 className="mb-2 text-xl font-semibold">
                      {feature.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default Features;
