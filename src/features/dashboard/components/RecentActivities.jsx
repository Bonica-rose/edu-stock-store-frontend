import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "../../../shared/utils/dateFormatter";

export default function RecentActivities({ activities = [] }) {
  return (
    <Card className="mt-6 rounded-sm">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>

      <CardContent>
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recent activities found.
          </p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity._id}
                className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-[13px] text-blue-900/80">
                    {activity.description}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {activity.user
                      ? `${activity.user.firstName} ${activity.user.lastName}`
                      : "System"}
                  </p>
                </div>

                <span className="text-xs text-muted-foreground">
                  {/* {new Date(activity.createdAt).toLocaleString()} */}
                  {formatDateTime(activity.createdAt, "DD MMM, YYYY h:mm:ss A")}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
