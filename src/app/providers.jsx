import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "./store";
import ThemeProvider from "@/shared/components/ThemeProvider";

export default  function Providers({ children }) {
    return (
      <Provider store={store}>
        <ThemeProvider>
          {children}
          <Toaster
            richColors
            position="top-left"
            toastOptions={{
              style: {
                borderRadius: "5px",
                paddingBlock: "0.58rem",
                paddingInline: "1.25rem",
                fontSize: "0.875rem",
              },
            }}
          />
        </ThemeProvider>
      </Provider>
    );
}
