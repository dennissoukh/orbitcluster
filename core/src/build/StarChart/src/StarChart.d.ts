import { AstroDataContract, ChartStateContract } from "./contracts";
export declare class StarChart {
    chartState: ChartStateContract;
    astroData: AstroDataContract;
    constructor(chartState: ChartStateContract, astroData: AstroDataContract);
    create(): void;
}
