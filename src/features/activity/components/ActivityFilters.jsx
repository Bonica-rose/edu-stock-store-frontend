import { RotateCcw } from "lucide-react";

import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import SearchableSelect from "@/shared/components/SearchableSelect";
import DatePicker from "@/shared/components/DatePicker";

import {
  ACTIVITY_MODULES,
  ACTIVITY_ACTIONS,
} from "../utils/activityConstants";

export default function ActivityFilters({
  module,
  action,
  user,
  startDate,
  endDate,

  users = [],

  onModuleChange,
  onActionChange,
  onUserChange,
  onStartDateChange,
  onEndDateChange,
  onReset,
}) {
  const moduleOptions = [
    {
      value: "all",
      label: "All Modules",
    },

    ...Object.values(ACTIVITY_MODULES).map((module) => ({
      value: module,
      label: module,
    })),
  ];

  const actionOptions = [
    {
      value: "all",
      label: "All Actions",
    },

    ...Object.values(ACTIVITY_ACTIONS).map((action) => ({
      value: action,
      label: action,
    })),
  ];

  const userOptions = [
    {
      value: "all",
      label: "All Users",
    },

    ...users.map((user) => ({
      value: user._id,
      label: [user.firstName, user.lastName].filter(Boolean).join(" "),
    })),
  ];

  return (
    <div className="flex flex-wrap items-end gap-4">
      {/* Module */}
      <Field className="w-full sm:w-45">

        <SearchableSelect
          value={module}
          onValueChange={onModuleChange}
          options={moduleOptions}
          placeholder="All Modules"
        />
      </Field>

      {/* Action */}
      <Field className="w-full sm:w-45">

        <SearchableSelect
          value={action}
          onValueChange={onActionChange}
          options={actionOptions}
          placeholder="All Actions"
        />
      </Field>

      {/* User */}
      <Field className="w-full sm:w-55">

        <SearchableSelect
          value={user}
          onValueChange={onUserChange}
          options={userOptions}
          placeholder="All Users"
        />
      </Field>

      {/* Start Date */}
      <Field className="w-full sm:w-42.5">

        <DatePicker
          value={startDate}
          onChange={onStartDateChange}
          placeholder="From date"
        />
      </Field>

      {/* End Date */}
      <Field className="w-full sm:w-42.5">
        <DatePicker
          value={endDate}
          onChange={onEndDateChange}
          placeholder="To date"
          className="w-full sm:w-42.5"
        />
      </Field>

      {/* Reset */}
      <Button type="button" variant="outline" onClick={onReset}>
        <RotateCcw className="size-4" />
        Reset
      </Button>
    </div>
  );
}
