import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BranchFilter({ value, onChange, branches = [] }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-52">
        <SelectValue placeholder="All Branches" />
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
  );
}
