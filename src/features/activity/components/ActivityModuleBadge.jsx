import { Badge } from "@/components/ui/badge";

import { ACTIVITY_MODULES } from "../utils/activityConstants";

const moduleStyles = {
  [ACTIVITY_MODULES.AUTH]:
    "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800",

  [ACTIVITY_MODULES.USER]:
    "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",

  [ACTIVITY_MODULES.BRANCH]:
    "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800",

  [ACTIVITY_MODULES.CATEGORY]:
    "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",

  [ACTIVITY_MODULES.VENDOR]:
    "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800",

  [ACTIVITY_MODULES.PURCHASE]:
    "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800",

  [ACTIVITY_MODULES.INVENTORY]:
    "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",

  [ACTIVITY_MODULES.ASSET]:
    "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800",

  [ACTIVITY_MODULES.MAINTENANCE]:
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",

  [ACTIVITY_MODULES.SETTINGS]:
    "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800",

  [ACTIVITY_MODULES.REPORT]:
    "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800",
};

export default function ActivityModuleBadge({ module }) {
  const className =
    moduleStyles[module] || "bg-muted text-muted-foreground border-border";

  return (
    <Badge variant="outline" className={className}>
      {module || "-"}
    </Badge>
  );
}
