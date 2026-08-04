import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShieldCheck, LogIn, LogOut, KeyRound } from "lucide-react";

import { fetchProfileActivity } from "../redux/profileThunks";
import { formatDateTime } from "@/shared/utils/dateFormatter";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Loader from "@/shared/components/Loader";

export default function RecentActivityCard() {
  const dispatch = useDispatch();

  const { activity, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfileActivity());
  }, [dispatch]);

  const getActionIcon = (action) => {
    switch (action?.toLowerCase()) {
      case "login":
        return <LogIn className="h-4 w-4 text-green-600" />;

      case "logout":
        return <LogOut className="h-4 w-4 text-red-600" />;

      case "change password":
        return <KeyRound className="h-4 w-4 text-amber-600" />;

      default:
        return <ShieldCheck className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          Recent Authentication Activity
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading.activity ? (
          <div className="text-sm text-muted-foreground"><Loader /></div>
        ) : activity?.length ? (
          <div className="space-y-4">
            {activity.map((item, index) => (
              <div key={item._id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="mt-1">{getActionIcon(item.action)}</div>

                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{item.action}</Badge>
                      </div>

                      <p className="mt-1 text-sm">{item.description}</p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDateTime(item.createdAt, `MMM DD, YYYY HH:mm:ss A`)}
                      </p>

                      {item.ipAddress && (
                        <p className="text-xs text-muted-foreground">
                          IP: {item.ipAddress}
                        </p>
                      )}

                      {item.userAgent && (
                        <p className="truncate text-xs text-muted-foreground">
                          {item.userAgent}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {index !== activity.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No recent authentication activity found.
          </p>
        )}
      </CardContent>
    </Card>
  );
}