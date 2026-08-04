export default function PageHeader({ title, description }) {
    return (
        <div>
            <h1 className="text-xl font-semibold">{title}</h1>

            <p className="text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    );
}
