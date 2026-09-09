import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import StatusFilter from "@/shared/components/filters/StatusFilter";

const CATEGORY_TYPES = [
    { value: "all", label: "All Types" },
    { value: "Inventory", label: "Inventory" },
    { value: "Asset", label: "Asset" },
    { value: "Both", label: "Both" },
];

export default function CategoryFilter({
    type,
    isActive,
    onTypeChange,
    onStatusChange,
}) {
    return (
        <div className="flex flex-wrap items-end gap-1">
            {/* Category Type */}
            <Select value={type} onValueChange={onTypeChange}>
                <SelectTrigger className="w-full sm:w-45">
                <SelectValue>
                    {CATEGORY_TYPES.find((option) => option.value === type)?.label ??
                    "All Types"}
                </SelectValue>
                </SelectTrigger>

                <SelectContent>
                {CATEGORY_TYPES.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                    {option.label}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>

            {/* Category Status */}
            <StatusFilter value={isActive} onChange={onStatusChange} />
        </div>
    );
}
