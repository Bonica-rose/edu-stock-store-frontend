import logo from "@/assets/logo/transparent_white.png";

const Footer = () => {
  return (
    <footer id="contact" className="border-t bg-slate-800 text-white py-3">
      <div className="mx-auto max-w-7xl py-1 text-center text-sm text-slate-300">
        <p className="font-semibold">Edu Stock & Store</p>

        <div className="flex flex-col items-center">
          <img
            src={logo}
            alt="Edu Stock & Store"
            className="w-50 object-cover"
          />

          <p className=" text-sm text-slate-500">
            Inventory & Asset Management System
          </p>
        </div>

        <p className="">© 2026 All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
