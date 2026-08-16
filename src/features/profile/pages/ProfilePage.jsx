import { useSelector } from "react-redux";
import ProfileCard from "../components/ProfileCard";
import RecentActivityCard from "../components/RecentActivityCard";
import PageHeader from "@/shared/components/PageHeader";
import Loader from "@/shared/components/Loader";

export default function ProfilePage() {
  const { loading } = useSelector((state) => state.auth);

  if (loading.currentUser) {
    return <div><Loader /></div>;
  }
  return (
    <div className="space-y-3">
      <PageHeader
        title="My Profile"
        description="View and manage your account information."
      />

      <ProfileCard />
      <RecentActivityCard />
    </div>
  );
}
