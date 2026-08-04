import PageHeader from "@/shared/components/PageHeader";

import ChangePasswordForm from "../components/ChangePasswordForm";

export default function ChangePasswordPage() {
    return (
        <div className="space-y-6">
        <PageHeader
            title="Change Password"
            description="Update your account password to keep your account secure."
        />

        <ChangePasswordForm />
        </div>
    );
}
