import { useSelector } from "react-redux";

export default function useDateFormat() {
    return (
        useSelector((state) => state.settings.settings?.dateFormat) ??
        "DD/MM/YYYY"
    );
}