import { ArrowRight } from "lucide-react";

const steps = [
    { label: "CT Scan", image: "/images/ct-scan.jpg" },
    { label: "Medical Image\nSegmentation", image: "/images/segmentation.jpg" },
    { label: "Implant Design", image: "/images/implant-design.jpg" },
    { label: "3D Printing", image: "/images/3d-printing.jpg" },
    { label: "Clinical Outcome", image: "/images/clinical-outcome.jpg" },
];

export function WorkflowPipeline() {
    return (
        <div className="w-full rounded-2xl border border-slate-100/90 bg-white p-3 shadow-xs sm:p-4">
            <div className="flex items-start justify-between">
                {steps.map((step, i) => (
                    <div key={step.label} className="flex flex-1 items-start">
                        {/* Step thumbnail & label */}
                        <div className="flex flex-1 flex-col items-center">
                            <div className="aspect-square w-13 overflow-hidden rounded-xl bg-black shadow-xs sm:w-15 md:w-16 lg:w-15 xl:w-18">
                                <img
                                    src={step.image}
                                    alt={step.label.replace("\n", " ")}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <p className="mt-2 text-center text-[10px] leading-tight font-semibold text-slate-700 sm:text-[11px] xl:text-xs">
                                {step.label.split("\n").map((line, idx) => (
                                    <span key={idx} className="block">
                                        {line}
                                    </span>
                                ))}
                            </p>
                        </div>

                        {/* Connecting Arrow (vertically centered with the thumbnail) */}
                        {i < steps.length - 1 && (
                            <div className="flex h-13 shrink-0 items-center justify-center px-0.5 text-slate-400 sm:h-15 sm:px-1 md:h-16 lg:h-15 xl:h-18">
                                <ArrowRight className="h-3.5 w-3.5 stroke-[1.5] sm:h-4 sm:w-4" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
