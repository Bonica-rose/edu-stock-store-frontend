import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RoleFilter({ value, onChange, roles = [] }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-52">
        <SelectValue placeholder="All Roles" />
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
  );
}
