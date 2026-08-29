import { Badge } from "@/components/ui/badge";

import { ACTIVITY_ACTIONS } from "../utils/activityConstants";

const actionStyles = {
  // CRUD
  [ACTIVITY_ACTIONS.CREATE]:
    "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",

  [ACTIVITY_ACTIONS.UPDATE]:
    "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",

  [ACTIVITY_ACTIONS.DELETE]:
    "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",

  [ACTIVITY_ACTIONS.VIEW]:
    "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800",

  // Authentication
  [ACTIVITY_ACTIONS.LOGIN]:
    "bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",

  [ACTIVITY_ACTIONS.LOGOUT]:
    "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800",

  [ACTIVITY_ACTIONS.CHANGE_PASSWORD]:
    "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800",

  // Status / assignment
  [ACTIVITY_ACTIONS.STATUS_CHANGE]:
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",

  [ACTIVITY_ACTIONS.ASSIGN]:
    "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800",

  [ACTIVITY_ACTIONS.RETURN]:
    "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800",

  // Stock
  [ACTIVITY_ACTIONS.STOCK_IN]:
    "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",

  [ACTIVITY_ACTIONS.STOCK_OUT]:
    "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800",

  [ACTIVITY_ACTIONS.STOCK_TRANSFER]:
    "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800",

  [ACTIVITY_ACTIONS.STOCK_ADJUSTMENT]:
    "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",

  // Maintenance
  [ACTIVITY_ACTIONS.START_MAINTENANCE]:
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",

  [ACTIVITY_ACTIONS.COMPLETE_MAINTENANCE]:
    "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",

  [ACTIVITY_ACTIONS.CANCEL_MAINTENANCE]:
    "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",

  // Reports
  [ACTIVITY_ACTIONS.EXPORT]:
    "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800",
};

export default function ActivityActionBadge({ action }) {
  const className =
    actionStyles[action] || "bg-muted text-muted-foreground border-border";

  return (
    <Badge variant="outline" className={className}>
      {action || "-"}
    </Badge>
  );
}
