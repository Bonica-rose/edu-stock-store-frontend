import logoPic from "@/assets/images/logo-pic.png";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="border-t bg-slate-800 dark:bg-slate-900 text-white py-3"
    >
      <div className="mx-auto max-w-7xl py-1 text-center text-sm text-slate-300">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 pb-3">
            <img
              src={logoPic}
              alt="Edu Stock & Store"
              className="h-10 w-auto object-contain"
            />

            <div className="leading-tight">
              <h1 className="text-lg font-bold">
                <span className="text-blue-900">Edu</span>{" "}
                <span className="text-blue-800">Stock</span>
                <span className="text-slate-700 dark:text-slate-500">&</span>
                <span className="text-green-700">Store</span>
              </h1>

              <p className="text-[10px] text-muted-foreground">
                Manage Smarter. Store Better.
              </p>
            </div>
          </div>

          <p className=" text-[12.5px] text-slate-400 dark:text-slate-500">
            Inventory & Asset Management System
          </p>
        </div>

        <p className="text-slate-300 dark:text-slate-400">
          © 2026 All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
