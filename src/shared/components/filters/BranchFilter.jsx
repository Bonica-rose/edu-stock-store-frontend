import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field } from "@/components/ui/field";

export default function BranchFilter({ value, onChange, branches = [] }) {
  const selectedBranch = branches.find((branch) => branch._id === value);
  return (
    <Field className="full sm:w-45">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue>
            {value === "all"
              ? "All Branches"
              : (selectedBranch?.branchName ?? "All Branches")}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Branches</SelectItem>

          {branches.map((branch) => (
            <SelectItem key={branch._id} value={branch._id}>
              {branch.branchName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}
