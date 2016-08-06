type LogoSize = "large" | "medium" | "small";

interface LogoStyles { width: string; }

const LOGO_CLASSES = {
    large: "logo--large",
    medium: "logo--medium",
    small: "logo--small"
};

export class LogoController {
    size: LogoSize;
    width: string;

    getClasses(): string { return LOGO_CLASSES[this.size]; }

    getStyles(): LogoStyles { if (this.width) { return { width: this.width }; }}
}
