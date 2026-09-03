const metrics = [
    { value: "500+", label: "Surgical Cases", iconSrc: "/logo/stat-1.svg" },
    { value: "100+", label: "Healthcare Professionals", iconSrc: "/logo/stat-2.svg" },
    { value: "20+", label: "Clinical Partners", iconSrc: "/logo/stat-3.svg" },
    { value: "99.9%", label: "System Uptime", iconSrc: "/logo/stat-4.svg" },
];

export function MetricsBar() {
    return (
        <div className="w-full rounded-2xl bg-[#1B74E4] px-5 py-5 text-white shadow-md sm:px-7 sm:py-6 lg:px-8 lg:py-6.5 xl:px-9 xl:py-7">
            <div className="flex items-center justify-between">
                {metrics.map((metric, i) => (
                    <div
                        key={metric.label}
                        className={`flex flex-1 items-center gap-3 sm:gap-3.5 lg:gap-4 ${
                            i > 0 ? "border-l border-blue-400/50 pl-3 sm:pl-4 lg:pl-5 xl:pl-6" : ""
                        }`}
                    >
                        <img
                            src={metric.iconSrc}
                            alt=""
                            aria-hidden="true"
                            className="h-8 w-auto max-w-[40px] shrink-0 object-contain sm:h-9 lg:h-10 xl:h-11 xl:max-w-[46px]"
                        />
                        <div className="min-w-0">
                            <p className="text-base leading-none font-bold sm:text-lg lg:text-xl xl:text-2xl">
                                {metric.value}
                            </p>
                            <p className="mt-1 truncate text-[11px] leading-tight text-blue-100/90 sm:text-xs lg:text-[13px]">
                                {metric.label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
