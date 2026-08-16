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
