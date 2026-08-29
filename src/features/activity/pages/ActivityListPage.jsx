import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { History as HistoryIcon } from "lucide-react";
import { toast } from "sonner";

import PageHeader from "@/shared/components/PageHeader";
import TableToolbar from "@/shared/components/table/TableToolbar";
import TablePagination from "@/shared/components/table/TablePagination";

import ActivityFilters from "../components/ActivityFilters";
import ActivityTable from "../components/ActivityTable";

import { fetchActivities } from "../redux/activityThunks";
import ActivityDetailsSheet from "../components/ActivityDetailsSheet";

export default function ActivityListPage() {
  const dispatch = useDispatch();

  const { activities, pagination, loading, error } = useSelector(
    (state) => state.activity,
  );
  console.log(activities);

  // Query State
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    module: "all",
    action: "all",
    user: "all",
    startDate: "",
    endDate: "",
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Fetch Activities
  const loadActivities = useCallback(() => {
    dispatch(
      fetchActivities({
        page,
        limit,
        search,
        module: filters.module,
        action: filters.action,
        user: filters.user,
        startDate: filters.startDate,
        endDate: filters.endDate,
        sortBy,
        sortOrder,
      }),
    );
  }, [dispatch, page, limit, search, filters, sortBy, sortOrder]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  // Error
  useEffect(() => {
    if (error.list) {
      toast.error(error.list);
    }
  }, [error.list]);

  // Search
  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  // Filters
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    setPage(1);
  };

  const handleModuleChange = (value) => {
    handleFilterChange("module", value);
  };

  const handleActionChange = (value) => {
    handleFilterChange("action", value);
  };

  const handleUserChange = (value) => {
    handleFilterChange("user", value);
  };

  const handleStartDateChange = (value) => {
    handleFilterChange("startDate", value);
  };

  const handleEndDateChange = (value) => {
    handleFilterChange("endDate", value);
  };

  // Reset
  const handleReset = () => {
    setSearch("");

    setFilters({
      module: "all",
      action: "all",
      user: "all",
      startDate: "",
      endDate: "",
    });

    setPage(1);
    setLimit(10);
    setSortBy("createdAt");
    setSortOrder("desc");
  };

  // Pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  // Sorting
  const handleSortChange = (column, direction) => {
    setSortBy(column);
    setSortOrder(direction);
    setPage(1);
  };

  // View
  const handleView = (activity) => {
    // Add navigation here when ActivityDetailsPage is created.
    console.log("View activity:", activity);
    setSelectedActivity(activity);
    setDetailsOpen(true);
  };

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Activity Logs"
        description="View and monitor system activity logs."
        icon={HistoryIcon}
      />
      <div className="bg-white rounded-lg border border-muted p-3 mt-3">
        <div className="space-y-4"> 
          {/* Toolbar */}
          <TableToolbar
            search={search}
            onSearchChange={handleSearchChange}
            searchPlaceholder="Search activity logs..."
            searchTitle="Search Activity"
          />

          {/* Filters */}
          <ActivityFilters
            module={filters.module}
            action={filters.action}
            user={filters.user}
            startDate={filters.startDate}
            endDate={filters.endDate}
            // User options will come from your user API.
            users={[]}
            onModuleChange={handleModuleChange}
            onActionChange={handleActionChange}
            onUserChange={handleUserChange}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            onReset={handleReset}
          />

          {/* Table */}
          <ActivityTable
            activities={activities}
            loading={loading.list}
            onView={handleView}
          />

          {/* Pagination */}
          <TablePagination
            pagination={pagination}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </div>

        {/* Activity Details */}
        <ActivityDetailsSheet
          activity={selectedActivity}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
        />
      </div>
    </>
  );
}
