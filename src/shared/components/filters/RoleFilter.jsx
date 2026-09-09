import { Field } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RoleFilter({ value, onChange, roles = [] }) {
  return (
    <Field className="full sm:w-45">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue>
            {value === "all"
              ? "All Roles"
              : (roles.find((role) => role === value) ?? "All Roles")}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>

          {roles.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}
