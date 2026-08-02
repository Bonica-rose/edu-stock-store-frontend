import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProfile } from "../redux/profileThunks";

import ProfileCard from "../components/ProfileCard";
import RecentActivityCard from "../components/RecentActivityCard";

export default function ProfilePage() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    if (loading.fetch) {
        return <p>Loading profile...</p>;
    }
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-semibold">My Profile</h1>

                <p className="text-sm text-muted-foreground">
                View and manage your account information.
                </p>
            </div>

            <ProfileCard />
            <RecentActivityCard />
        </div>
    );
}
