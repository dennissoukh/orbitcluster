"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarChart = void 0;
class StarChart {
    constructor(chartState, astroData) {
        this.chartState = chartState;
        this.astroData = astroData;
    }
    create() {
        console.log(this.chartState);
    }
}
exports.StarChart = StarChart;
