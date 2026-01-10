// Type declarations for cal-heatmap and plugins
declare module 'cal-heatmap' {
    export interface CalHeatmapOptions {
        itemSelector?: HTMLElement | string;
        range?: number;
        domain?: {
            type: string;
            gutter?: number;
            label?: {
                text?: string;
                position?: string;
                textAlign?: string;
            };
        };
        subDomain?: {
            type: string;
            radius?: number;
            width?: number;
            height?: number;
            gutter?: number;
        };
        date?: {
            start?: Date;
            min?: Date;
            max?: Date;
            highlight?: Date[];
        };
        data?: {
            source: unknown[] | string;
            type?: string;
            x?: string;
            y?: string | ((d: unknown) => number);
            groupY?: string;
        };
        scale?: {
            color?: {
                type?: string;
                range?: string[];
                domain?: number[];
                scheme?: string;
            };
        };
    }

    export type PluginDefinition = [unknown, Record<string, unknown>];

    export default class CalHeatmap {
        paint(options: CalHeatmapOptions, plugins?: PluginDefinition[]): Promise<void>;
        destroy(): Promise<void>;
        next(n?: number): Promise<void>;
        previous(n?: number): Promise<void>;
    }
}

declare module 'cal-heatmap/plugins/Tooltip' {
    const Tooltip: unknown;
    export default Tooltip;
}

declare module 'cal-heatmap/plugins/LegendLite' {
    const LegendLite: unknown;
    export default LegendLite;
}

declare module 'cal-heatmap/plugins/CalendarLabel' {
    const CalendarLabel: unknown;
    export default CalendarLabel;
}

declare module 'cal-heatmap/cal-heatmap.css';
