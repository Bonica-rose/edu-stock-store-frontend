import LoginForm from "../components/LoginForm";

import logo from "@/assets/logo/transparent.png";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
            <div className="flex w-full max-w-md flex-col items-center">
                <img src={logo} alt="Edu Stock & Store" className="mb-5 h-20 w-auto" />

                <LoginForm />
            </div>
        </div>
    );
}
