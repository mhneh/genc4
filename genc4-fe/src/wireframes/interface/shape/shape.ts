export interface Shape {
    readonly fontSize: number;

    readonly fontFamily: string;

    readonly backgroundColor: string;

    readonly foregroundColor: string;

    readonly opacity: number;

    readonly strokeColor: string;

    readonly strokeThickness: number;

    readonly text: string;

    readonly textAlignment: string;

    readonly textDisabled: boolean;

    readonly renderCache: Record<string, any>;

    getAppearance(key: string): any;
}