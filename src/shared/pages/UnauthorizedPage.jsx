import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";

export default function UnauthorizedPage() {
  return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <ShieldX className="mb-4 size-9 text-destructive" />

      <h1 className="text-7xl font-bold text-destructive">403</h1>

      <h2 className="mt-4 text-2xl font-semibold">Access Denied</h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        You don't have permission to access this page.
      </p>

      <Button className="mt-6">
        <Link to="/edu/dashboard">Back to Dashboard</Link>
      </Button>
    </div>
  );
}
