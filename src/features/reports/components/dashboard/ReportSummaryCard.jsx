import { Card, CardContent } from "@/components/ui/card";

export default function ReportSummaryCard({
  title,
  value,
  icon: Icon,
  color,
  loading = false,
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>

          <p className="text-2xl font-semibold tracking-tight">
            {loading ? "—" : value}
          </p>
        </div>

        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`} >
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
