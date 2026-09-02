import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";

function getTimeZoneOffset(timeZone) {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone,
        timeZoneName: "longOffset",
    }).formatToParts(now);
    const offset = parts.find((part) => part.type === "timeZoneName")?.value;
    if (!offset || offset === "GMT") {
        return "UTC";
    }
    return offset.replace("GMT", "UTC");
}

export default function DateTimeWidget({
    timeZone,
    className = "",
}) {    
    // Store a standard current Date object in state (no manual localString shifts)
    const [date, setDate] = useState(() => new Date());

    useEffect(() => {
        const updateClock = () => {
            setDate(new Date());
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []); // Removed timeZone dependency since new Date() is zone-agnostic

    // Formatters handle the timezone shifting accurately
    const time = new Intl.DateTimeFormat("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone,
    }).format(date);

    const dateText = new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone,
    }).format(date);
    
    const offset = getTimeZoneOffset(timeZone);

    return (
        <div className={`flex h-15 w-52 items-center text-zinc-900 ${className}`}>
            <div className="min-w-0">
                {/* Time */}
                <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 shrink-0 text-sky-600" />
                    <span className="text-md font-semibold tracking-tight tabular-nums">
                    {time}
                    </span>
                </div>

                {/* Date + Timezone */}
                <p className="text-[13px] text-amber-800">
                    {dateText} · {offset}
                </p>
            </div>
        </div>
    );
}
