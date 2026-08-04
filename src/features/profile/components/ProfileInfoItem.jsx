import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileInfoItem({
  label,
  value,
  register,
  error,
  readOnly = false,
  type = "text",
  placeholder = "",
}) {
  const inputProps = register
    ? register
    : {
        defaultValue: value ?? "",
      };

  return (
    <div className="space-y-2 w-full">
      <Label>{label}</Label>

      <Input
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        {...inputProps}
        className={`w-full rounded-sm text-[15px]
          ${readOnly ? "bg-muted text-muted-foreground" : ""}
          ${error ? "border-destructive" : ""}
        `}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
