import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollText, CalendarClock } from "lucide-react";

export default function RecentActivityCard({ activities = [] }) {
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ScrollText className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>

      <CardContent>
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recent activity found.
          </p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity._id}
                className="flex items-start justify-between border-b pb-3 last:border-none"
              >
                <div>
                  <p className="font-medium">{activity.description}</p>

                  <p className="text-xs text-muted-foreground">
                    {activity.module} • {activity.action}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarClock className="h-4 w-4" />

                  {new Date(activity.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
