import { cn } from "@/lib/utils";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

export default function SearchableSelect({
  value,
  onValueChange,
  options = [],
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  disabled = false,
  id,
  error = false,
}) {
  const selectedOption =
    options.find((option) => option.value === value) ?? null;

  const handleValueChange = (option) => {
    if (!option) {
      onValueChange("", null);
      return;
    }

    // Store only ID in React Hook Form
    onValueChange(option.value, option);
  };

  return (
    <Combobox
      items={options}
      value={selectedOption}
      onValueChange={handleValueChange}
      itemToStringValue={(option) => option?.label ?? ""}
      disabled={disabled}
      allowsEmptyCollection
    >
      <ComboboxInput
        id={id}
        placeholder={searchPlaceholder}
        showClear
        aria-label={placeholder}
        aria-invalid={error}
        // This updates the inner input if needed
        inputClassName="focus-visible:ring-0 focus-visible:border-0"
        // This updates the container box directly for error states
        className={cn(
          error && [
            "border-destructive",
            "!has-focus:border-destructive",
            "!has-focus:ring-destructive",
          ],
        )}
      />

      <ComboboxContent>
        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>

        <ComboboxList>
          {(option) => (
            <ComboboxItem key={option.value} value={option}>
              {option.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
