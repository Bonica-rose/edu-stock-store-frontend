import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

import { getSetupStatus } from "@/features/setup/redux/setupThunks";

const LandingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGetStarted = async () => {
        const result = await dispatch(getSetupStatus());

        if (getSetupStatus.fulfilled.match(result)) {
            if (result.payload.data.isSetupCompleted) {
                navigate("/login");
            } else {
                navigate("/setup");
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar onGetStarted={handleGetStarted} />
            <Hero onGetStarted={handleGetStarted} />
            <Features />
            <Footer />
        </div>
    );
};

export default LandingPage;
