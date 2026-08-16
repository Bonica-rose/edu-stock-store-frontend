import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Pencil, X } from "lucide-react";

import EditProfileForm from "./EditProfileForm";

export default function ProfileCard() {

  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className="rounded-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className={`text-blue-900`}>Personal Information</CardTitle>

        {!isEditing ? (
          <Button
            variant="outline"
            className="rounded-sm"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <Button
            variant="outline"
            className="rounded-sm"
            onClick={() => setIsEditing(false)}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        )}
      </CardHeader>

      <CardContent>
        <EditProfileForm
          isEditing={isEditing}
          onCancel={() => setIsEditing(false)}
        />
      </CardContent>
    </Card>
  );
}
