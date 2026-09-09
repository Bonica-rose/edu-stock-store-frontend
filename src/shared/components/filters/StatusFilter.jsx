import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = [
    { value: "all", label: "All Status" },
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
];

export default function StatusFilter({ value, onChange }) {
    console.log("Status option selected: ",value);
    const selectedStatus =
        STATUS_OPTIONS.find((option) => option.value === value) ?? STATUS_OPTIONS[0];

    return (
        <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full sm:w-45">
            <SelectValue>{selectedStatus.label}</SelectValue>
        </SelectTrigger>

        <SelectContent>
            {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
                {option.label}
            </SelectItem>
            ))}
        </SelectContent>
        </Select>
    );
}
