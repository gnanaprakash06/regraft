import { MetricsBar } from "./metrics-bar";
import { RegraftLogo } from "./regraft-logo";
import { WorkflowPipeline } from "./workflow-pipeline";

export function ProductShowcase() {
    return (
        <div className="flex h-full flex-col justify-between gap-4 lg:gap-5">
            {/* Top Header & Visual Showcase - CSS Grid */}
            <div className="relative grid flex-1 grid-cols-1 items-end gap-4 sm:grid-cols-12 lg:gap-6">
                {/* Left: Logo + Title + Description (Top-Left) */}
                <div className="z-10 flex flex-col items-start self-start sm:col-span-7 lg:col-span-7 xl:col-span-7">
                    {/* ReGRAFT Logo */}
                    <div className="flex items-center">
                        <RegraftLogo className="h-10 w-auto object-contain sm:h-11 lg:h-12" />
                    </div>

                    {/* Heading + Subtitle */}
                    <div className="mt-4 w-full max-w-[340px] sm:mt-5 sm:max-w-[360px] lg:mt-6 lg:max-w-[390px] xl:max-w-[430px]">
                        <h1 className="text-2xl leading-[1.18] font-extrabold tracking-tight text-slate-900 sm:text-3xl xl:text-[38px]">
                            Advanced Patient-Specific
                            <br />
                            Implant &amp; Surgical
                            <br />
                            <span className="text-[#166AAF]">Planning Platform</span>
                        </h1>
                        <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-[13px] xl:text-sm">
                            Comprehensive digital workflow for Cranial, CMF, Cranial Plates, TMJ
                            Reconstruction and Patient-Specific Implants.
                        </p>
                    </div>
                </div>

                {/* Right: 3D Skull Model (Bottom-Right) */}
                <div className="relative flex items-end justify-center self-end sm:col-span-5 sm:justify-end lg:col-span-5 xl:col-span-5">
                    <img
                        src="/images/hero-skull-1.png"
                        alt="3D skull anatomical model with patient-specific implants"
                        className="h-auto max-h-[270px] w-auto object-contain select-none sm:max-h-[320px] md:max-h-[360px] lg:max-h-[400px] xl:max-h-[440px]"
                    />
                </div>
            </div>

            {/* Workflow Pipeline */}
            <div className="w-full">
                <WorkflowPipeline />
            </div>

            {/* Metrics Bar */}
            <div className="w-full">
                <MetricsBar />
            </div>
        </div>
    );
}
