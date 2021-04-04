import { AstroDataContract, ChartStateContract } from "./contracts";

export class StarChart {
    constructor(
        public chartState: ChartStateContract,
        public astroData: AstroDataContract,
    ) {}

    public create() {
        console.log(this.chartState);
    }
}
