import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "./store";

export default  function Providers({ children }) {
    return (
        <Provider store={store}>
            {children}
            <Toaster
                richColors
                position="top-right"
                toastOptions={{
                    style: {
                        borderRadius: "5px", 
                        paddingBlock: "0.58rem", 
                        paddingInline: "1.25rem",
                        fontSize: "0.875rem", 
                    },
                }}
            />
        </Provider>
    );
}
