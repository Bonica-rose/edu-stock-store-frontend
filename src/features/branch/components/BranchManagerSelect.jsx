import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export default function BranchManagerSelect({
  value,
  onChange,
  managers = [],
  error,
  disabled = false,
}) {
  return (
    <Field>
      <FieldLabel>Branch Manager</FieldLabel>

      <Select value={value || ""} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className={error ? "border-destructive" : ""}>
          <SelectValue>
            {value
              ? managers.find((m) => m._id === value)
                ? `${managers.find((m) => m._id === value).firstName} ${
                    managers.find((m) => m._id === value).lastName
                  }`
                : "Select Branch Manager"
              : "Select Branch Manager"}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="">No Manager</SelectItem>

          {managers.map((manager) => (
            <SelectItem key={manager._id} value={manager._id}>
              {manager.firstName} {manager.lastName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <FieldError>{error?.message}</FieldError>
    </Field>
  );
}
