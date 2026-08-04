import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import dasboardPreview from "@/assets/images/dashboard-preview.png";

const Hero = ({ onGetStarted }) => {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-7xl bg-gray-50 gap-12 px-6 py-18 lg:grid-cols-2 lg:items-center"
    >
      <div>
        <h1 className="mb-6 text-5xl font-bold leading-tight text-slate-900">
          Inventory & Asset
          <br />
          Management System
        </h1>

        <p className="mb-8 max-w-xl text-lg leading-8 text-slate-600">
          Manage inventory, assets, maintenance, vendors, and stock movements
          across multiple branches through one centralized platform.
        </p>

        <button
          onClick={onGetStarted}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-900 px-8 py-4 font-semibold text-white transition hover:bg-blue-800"
        >
          Explore Edu Stock&Store
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="hidden justify-center lg:flex">
        <img
          src={dasboardPreview}
          alt="Dashboard Preview"
          className="w-full max-w-xl h-98 object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
