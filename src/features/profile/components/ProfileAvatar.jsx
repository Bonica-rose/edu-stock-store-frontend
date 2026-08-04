import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, User } from "lucide-react";

export default function ProfileAvatar({ image, isEditing, onImageChange }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    // console.log(file);
    if (!file) return;

    onImageChange(file);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-36 w-36 rounded-sm">
        <AvatarImage
          src={image instanceof File ? URL.createObjectURL(image) : image}
        />
        <AvatarFallback className="rounded-sm">
          <User className="h-12 w-12" />
        </AvatarFallback>
      </Avatar>

      {isEditing && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />

          <Button
            type="button"
            variant="outline"
            className="rounded-sm"
            onClick={() => fileInputRef.current.click()}
          >
            <Camera className="mr-2 h-4 w-4" />
            Upload Photo
          </Button>
        </>
      )}
    </div>
  );
}
