export default function Footer() {
    return (
        <footer className="flex h-12 items-center justify-between border-t bg-background px-6 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Edu Stock&Store</p>

            <p>Version 1.0.0</p>
        </footer>
    );
}
