import { ProductShowcase } from "./product-showcase";
import { AuthCard } from "./auth-card";

export function SignInPage() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#DCEBFA] p-4 sm:p-6 lg:p-8 xl:p-10">
            <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_440px] lg:gap-8 xl:grid-cols-[1fr_470px] xl:gap-10">
                {/* Left Column – Product Showcase */}
                <div className="flex h-full flex-col justify-between">
                    <ProductShowcase />
                </div>

                {/* Right Column – Auth Card */}
                <div className="flex h-full w-full flex-col">
                    <AuthCard />
                </div>
            </div>
        </div>
    );
}
