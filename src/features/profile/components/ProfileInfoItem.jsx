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
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <Input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        readOnly={readOnly}
        {...(register || {})}
        className={`rounded-sm ${
          readOnly ? "bg-muted text-muted-foreground" : ""
        }`}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
