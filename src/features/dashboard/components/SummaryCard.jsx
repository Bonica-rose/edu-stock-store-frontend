import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SummaryCard({
  title,
  value,
  icon: Icon,
  iconColor,
  description,
}) {
  return (
    <Card className="rounded-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>

        {Icon && <Icon className={`h-5 w-5 ${iconColor}`} />}
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold">{value}</div>

        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
