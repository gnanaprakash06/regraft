import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthProvider";
import { Cpu, Eye, EyeOff, Loader2, ShieldCheck, Users } from "lucide-react";
import { useState } from "react";
import { RegraftLogo } from "./regraft-logo";

function GoogleIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 shrink-0" aria-hidden="true">
            <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
            />
            <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
            />
            <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
            />
            <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
            />
        </svg>
    );
}

const features = [
    {
        icon: ShieldCheck,
        title: "Secure Access",
        desc: "Enterprise grade security",
    },
    {
        icon: Users,
        title: "Team Collaboration",
        desc: "Work seamlessly with your team",
    },
    {
        icon: Cpu,
        title: "Cloud Platform",
        desc: "Access anywhere, anytime",
    },
];

export function AuthCard() {
    const { login, googleLogin, isPending } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add sign-up flow when backend is ready
        if (isSignUp) return;
        try {
            await login(email, password);
        } catch {
            // Error is already handled by AuthProvider via notifyError
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
        } catch {
            // Error is already handled by AuthProvider via notifyError
        }
    };

    const toggleMode = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSignUp(!isSignUp);
    };

    return (
        <div className="flex h-full w-full flex-col justify-between overflow-y-auto rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-xl sm:p-7 xl:p-8">
            {/* Top Header */}
            <div className="flex flex-col items-center">
                <RegraftLogo className="h-9 w-auto shrink-0 object-contain sm:h-10 lg:h-11" />
                <h2 className="mt-1 text-center text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    {isSignUp ? "Create an Account" : "Welcome Back!"}
                </h2>
            </div>

            {/* Google sign-in */}
            <Button
                variant="outline"
                type="button"
                onClick={handleGoogleLogin}
                disabled={isPending}
                className="mt-3 h-10 w-full shrink-0 gap-2.5 rounded-lg border-blue-200 text-sm font-semibold text-slate-800 shadow-2xs hover:bg-blue-50/50 sm:h-11"
            >
                {isPending ? (
                    <Loader2 className="h-4.5 w-4.5 shrink-0 animate-spin" />
                ) : (
                    <GoogleIcon />
                )}
                {isSignUp ? "Sign up with Google" : "Sign in with Google"}
            </Button>

            {/* OR divider */}
            <div className="relative my-3 flex shrink-0 items-center">
                <Separator className="flex-1 bg-slate-200" />
                <span className="px-3 text-[11px] font-medium tracking-wider text-slate-400 uppercase">
                    OR
                </span>
                <Separator className="flex-1 bg-slate-200" />
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-1 flex-col justify-center space-y-3 sm:space-y-3.5"
            >
                {/* Full Name Field (Sign Up Only) */}
                {isSignUp && (
                    <div className="space-y-1">
                        <Label
                            htmlFor="sign-up-name"
                            className="text-xs font-semibold text-slate-800"
                        >
                            Full name<span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="sign-up-name"
                            type="text"
                            placeholder="Enter your full name"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="h-10 rounded-lg border-slate-300 text-sm focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                        />
                    </div>
                )}

                {/* Email Field */}
                <div className="space-y-1">
                    <Label htmlFor="auth-email" className="text-xs font-semibold text-slate-800">
                        Email address<span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="auth-email"
                        type="email"
                        placeholder="Enter email address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-10 rounded-lg border-slate-300 text-sm focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                    />
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                    <Label htmlFor="auth-password" className="text-xs font-semibold text-slate-800">
                        Password<span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <Input
                            id="auth-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-10 rounded-lg border-slate-300 pr-10 text-sm focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Confirm Password Field (Sign Up Only) */}
                {isSignUp && (
                    <div className="space-y-1">
                        <Label
                            htmlFor="auth-confirm-password"
                            className="text-xs font-semibold text-slate-800"
                        >
                            Confirm password<span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="auth-confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="h-10 rounded-lg border-slate-300 pr-10 text-sm focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Forgot password - only in sign in */}
                {!isSignUp && (
                    <div className="flex justify-end pt-0.5">
                        <a href="#" className="text-xs font-medium text-blue-600 hover:underline">
                            Forgot your password?
                        </a>
                    </div>
                )}

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={isPending}
                    className="mt-1 h-11 w-full shrink-0 rounded-lg bg-[#1B74E4] text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1565C0]"
                >
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isSignUp ? "Create account" : "Let's start"}
                </Button>
            </form>

            {/* Sign-up/Sign-in prompt */}
            <p className="my-2.5 shrink-0 text-center text-xs text-slate-600 sm:text-sm">
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <a
                    href="#"
                    onClick={toggleMode}
                    className="font-bold text-[#1B74E4] hover:underline"
                >
                    {isSignUp ? "Sign in" : "Create an account"}
                </a>
            </p>

            {/* Feature badges */}
            <div className="grid shrink-0 grid-cols-3 divide-x divide-slate-200 border-t border-slate-100 pt-3">
                {features.map((feat) => (
                    <div key={feat.title} className="flex flex-col items-center px-1.5 text-center">
                        <div className="mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#EBF3FC]">
                            <feat.icon className="h-4.5 w-4.5 text-[#1B74E4]" />
                        </div>
                        <p className="text-[11px] leading-tight font-bold text-slate-800">
                            {feat.title}
                        </p>
                        <p className="mt-0.5 text-[10px] leading-tight text-slate-500">
                            {feat.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
