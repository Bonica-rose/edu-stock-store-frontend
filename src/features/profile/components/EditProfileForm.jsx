import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { profileSchema } from "../validations/profileSchema";
import { updateProfile } from "../redux/profileThunks";

import ProfileAvatar from "./ProfileAvatar";
import ProfileInfoItem from "./ProfileInfoItem";

import useDateFormat from "@/shared/hooks/useDateFormat";
import { formatDateTime } from "@/shared/utils/dateFormatter";

import { Button } from "@/components/ui/button";

export default function EditProfileForm({ profile, isEditing, onCancel }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  
  const dateFormat = useDateFormat();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    if (!profile) return;

    reset({
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone ?? "",
      profileImage: profile.profileImage ?? "",
    });
  }, [profile, reset]);

  const onSubmit = async (data) => {
    const result = await dispatch(updateProfile(data));

    if (updateProfile.fulfilled.match(result)) {
      toast.success(result.payload.message);

      onCancel();
    } else {
      toast.error(result.payload?.message || "Unable to update profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ProfileAvatar
        image={watch("profileImage")}
        isEditing={isEditing}
        // onImageChange={(url) => setValue("profileImage", url)}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <ProfileInfoItem
          label="Employee ID"
          value={profile?.employeeId}
          readOnly
        />

        <ProfileInfoItem label="Email" value={profile?.email} readOnly />

        <ProfileInfoItem
          label="First Name"
          register={register("firstName")}
          error={errors.firstName?.message}
          readOnly={!isEditing}
        />

        <ProfileInfoItem
          label="Last Name"
          register={register("lastName")}
          error={errors.lastName?.message}
          readOnly={!isEditing}
        />

        <ProfileInfoItem
          label="Phone"
          register={register("phone")}
          error={errors.phone?.message}
          readOnly={!isEditing}
        />

        <ProfileInfoItem label="Role" value={profile?.role} readOnly />

        <ProfileInfoItem
          label="Branch"
          value={profile?.branch?.branchName}
          readOnly
        />

        <ProfileInfoItem
          label="Status"
          value={profile?.isActive ? "Active" : "Inactive"}
          readOnly
        />

        <ProfileInfoItem
          label="Last Login"
          value={formatDateTime(profile?.lastLogin, `${dateFormat} HH:mm`)}
          readOnly
        />
      </div>

      {isEditing && (
        <div className="flex justify-end">
          <Button
            type="submit"
            className="rounded-sm"
            disabled={loading.update}
          >
            {loading.update ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      )}
    </form>
  );
}
