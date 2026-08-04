import { ClipLoader } from "react-spinners";

export default function Loader({
    size = 35,
    color = "#1d4ed8", 
    fullScreen = false,
}) {
    const content = <ClipLoader size={size} color={color} />;

    if (fullScreen) {
        return (
        <div className="flex min-h-screen items-center justify-center">
            {content}
        </div>
        );
    }

    return <div className="flex items-center justify-center py-6">{content}</div>;
}
