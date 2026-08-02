import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <Hero />
            <Features />
            <Footer />
        </div>
    );
};

export default LandingPage;
