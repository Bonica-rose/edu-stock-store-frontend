import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import { Camera, User } from "lucide-react";

export default function ProfileAvatar({ profile, isEditing }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-36 w-36 rounded-sm">
        <AvatarImage src={profile?.profileImage} />

        <AvatarFallback className="rounded-sm">
          <User className="h-12 w-12" />
        </AvatarFallback>
      </Avatar>

      {isEditing && (
        <Button variant="outline" className="rounded-sm" type="button">
          <Camera className="mr-2 h-4 w-4" />
          Upload Photo
        </Button>
      )}
    </div>
  );
}
