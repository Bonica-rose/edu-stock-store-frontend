import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { profileSchema } from "../validations/profileSchema";
import { updateProfile } from "../redux/profileThunks";
import { setCurrentUser } from "@/features/auth/redux/authSlice";

import ProfileAvatar from "./ProfileAvatar";
import ProfileInfoItem from "./ProfileInfoItem";

import useDateFormat from "@/shared/hooks/useDateFormat";
import { formatDateTime } from "@/shared/utils/dateFormatter";

import { Button } from "@/components/ui/button";

export default function EditProfileForm({ isEditing, onCancel }) {
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
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      profileImage: "",
    },
  });

  useEffect(() => {
    if (!user) return;

    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone ?? "",
      profileImage: user.profileImage ?? "",
    });
  }, [user, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    if (data.phone) {
      formData.append("phone", data.phone);
    }

    if (data.profileImage instanceof File) {
      formData.append("profileImage", data.profileImage);
    }
    console.log("formData", formData);

    const result = await dispatch(updateProfile(formData));

    if (updateProfile.fulfilled.match(result)) {
      dispatch(setCurrentUser(result.payload.data));
      toast.success(result.payload.message);
      onCancel();
    } else {
      toast.error(result.payload?.message || "Unable to update profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <ProfileAvatar
          image={watch("profileImage")}
          isEditing={isEditing}
          onImageChange={(file) =>
            setValue("profileImage", file, {
              shouldDirty: true,
            })
          }
        />

        <div className="grid gap-4 md:grid-cols-2">
          <ProfileInfoItem label="Employee ID" value={user?.employeeId} readOnly />

          <ProfileInfoItem label="Email" value={user?.email} readOnly />

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

          <ProfileInfoItem label="Role" value={user?.role} readOnly />

          <ProfileInfoItem
            label="Branch"
            value={user?.branch?.branchName}
            readOnly
          />

          <ProfileInfoItem
            label="Status"
            value={user?.isActive ? "Active" : "Inactive"}
            readOnly
          />

          <ProfileInfoItem
            label="Last Login"
            value={formatDateTime(user?.lastLogin, `${dateFormat} HH:mm`)}
            readOnly
          />
        </div>
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
