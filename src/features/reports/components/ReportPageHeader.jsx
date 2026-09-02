import ReportExportButton from "./ReportExportButton";

export default function ReportPageHeader({
    title,
    description,
    canExport = false,
    exporting = false,
    onExport,
}) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-xl font-semibold tracking-tight">{title}</h1>

                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </div>

            {canExport && (
                <ReportExportButton onExport={onExport} exporting={exporting} />
            )}
        </div>
    );
}
