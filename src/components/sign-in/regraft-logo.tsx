interface RegraftLogoProps {
    className?: string;
}

export function RegraftLogo({ className = "h-10 w-auto object-contain" }: RegraftLogoProps) {
    return (
        <img
            src="/logo/regraft-logo.png"
            alt="ReGRAFT"
            className={`object-contain select-none ${className}`}
        />
    );
}
