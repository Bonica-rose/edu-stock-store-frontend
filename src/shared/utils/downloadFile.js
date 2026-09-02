export const downloadFile = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // 1. Generate a file-safe timestamp (e.g., "2026-08-30_08-31-00")
    const now = new Date();
    const pad = (num) => String(num).padStart(2, "0");

    const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const timeStr = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
    const timestamp = `${dateStr}_${timeStr}`;

    // 2. Inject timestamp right before the file extension
    let stampedFilename = filename;
    const lastDotIndex = filename.lastIndexOf(".");

    if (lastDotIndex !== -1) {
        const namePart = filename.substring(0, lastDotIndex);
        const extPart = filename.substring(lastDotIndex); // includes the dot (e.g., ".csv")
        stampedFilename = `${namePart}_${timestamp}${extPart}`;
    } else {
        // Fallback if the provided filename has no extension
        stampedFilename = `${filename}_${timestamp}`;
    }

    link.download = stampedFilename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};

