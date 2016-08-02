type LogoSize = "large" | "medium" | "small";

interface LogoStyles { width: string; }

const LOGO_SIZES = {
    large: 200,
    medium: 100,
    small: 50
};

export class LogoController {
    size: LogoSize;
    width: string;

    $onInit(): void {
        if (this.size && !this.width) { this.setDimensions(); }
    }

    getStyles(): LogoStyles { return { width: this.width }; }

    private setDimensions(): void { this.width = `${LOGO_SIZES[this.size]}px`; }
}
