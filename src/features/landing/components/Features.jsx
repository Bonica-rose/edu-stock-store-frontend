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
    <section id="features" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Core Features</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <Icon className={`mb-4 h-10 w-10 ${feature.color}`} />

                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>

                <p className="text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
