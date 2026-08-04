import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { companySettingsSchema } from "../validations/companySettingsSchema";
import { updateSettings } from "../redux/settingsThunks";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Pencil, Upload, Save, X } from "lucide-react";

export default function CompanySettingsCard() {
  const dispatch = useDispatch();

  const { settings, loading } = useSelector((state) => state.settings);
  const [isEditing, setIsEditing] = useState(false);
  const [logoPreview, setLogoPreview] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(companySettingsSchema),
  });

  useEffect(() => {
    if (!settings) return;

    reset({
      companyName: settings.companyName || "",
      companyEmail: settings.companyEmail || "",
      companyPhone: settings.companyPhone || "",
      companyAddress: settings.companyAddress || "",
      // companyLogo: settings.companyLogo || "",
    });

    setLogoPreview(settings.companyLogo || null);
  }, [settings, reset]);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
    ];

    if (!allowed.includes(file.type)) {
      toast.error("Only JPG, PNG, WEBP and SVG are allowed.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Maximum file size is 2 MB.");
      return;
    }
    
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleCancel = () => {
    reset();
    setLogoPreview(settings.companyLogo || null);
    setLogoFile(null);
    setIsEditing(false);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (logoFile) {
      formData.append("companyLogo", logoFile);
    }  
    
    // console.log("Form Data:", formData); // Log the FormData object for debugging

    const result = await dispatch(updateSettings(formData));

    if (updateSettings.fulfilled.match(result)) {
      toast.success(result.payload.message);
      setIsEditing(false);
      setLogoFile(null);
    } else {
      toast.error(result.payload?.message || "Unable to update settings.");
    }
  };

  return (
    <Card className="rounded-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Company Information</CardTitle>

          {!isEditing ? (
            <Button
              type="button"
              variant="outline"
              className="rounded-sm"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-sm"
                onClick={handleCancel}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>

              <Button
                type="submit"
                className="rounded-sm"
                disabled={loading.update}
              >
                <Save className="mr-2 h-4 w-4" />

                {loading.update ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          
          {/* Logo */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 rounded-sm">
              <AvatarImage src={logoPreview} />

              <AvatarFallback className="rounded-sm">ES</AvatarFallback>
            </Avatar>

            <input
              ref={fileInputRef}
              hidden
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
            />

            <Button
              type="button"
              variant="outline"
              className="rounded-sm"
              disabled={!isEditing}
              onClick={() => fileInputRef.current.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Change Logo
            </Button>
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName">
              Company Name <span className="text-destructive">*</span>
            </Label>

            <Input
              id="companyName"
              className={`rounded-sm text-[15px] placeholder:text-sm  
                ${errors.companyName ? "border-destructive" : ""}`}
              readOnly={!isEditing}
              {...register("companyName")}
            />

            <p className="text-sm text-destructive">
              {errors.companyName?.message}
            </p>
          </div>

          {/* Email + Phone */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyEmail">Company Email</Label>

              <Input
                id="companyEmail"
                type="email"
                className={`rounded-sm text-[15px] placeholder:text-sm  
                  ${errors.companyEmail ? "border-destructive" : ""}`}
                readOnly={!isEditing}
                {...register("companyEmail")}
              />

              <p className="text-sm text-destructive">
                {errors.companyEmail?.message}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyPhone">Company Phone</Label>

              <Input
                id="companyPhone"
                className={`rounded-sm text-[15px] placeholder:text-sm  
                  ${errors.companyPhone ? "border-destructive" : ""}`}
                readOnly={!isEditing}
                {...register("companyPhone")}
              />

              <p className="text-sm text-destructive">
                {errors.companyPhone?.message}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="companyAddress">Company Address</Label>

            <Input
              id="companyAddress"
              className={`rounded-sm text-[15px] placeholder:text-sm  
                ${errors.companyAddress ? "border-destructive" : ""}`}
              readOnly={!isEditing}
              {...register("companyAddress")}
            />

            <p className="text-sm text-destructive">
              {errors.companyAddress?.message}
            </p>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
