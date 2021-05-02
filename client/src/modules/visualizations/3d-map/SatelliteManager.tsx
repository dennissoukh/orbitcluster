import { Viewer } from 'cesium';
import { SatelliteEntityWrapper } from './SatelliteEntityWrapper';
import { satellite } from '../../../types/satellite';

export class SatelliteManager {
    viewer:     Viewer;
    satellites: any[] = [];

    constructor(viewer: Viewer, satellites: Array<satellite>) {
        this.viewer = viewer;
        this.processSatellites(satellites);
    }

    processSatellites(satellites: Array<satellite>) {
        satellites.forEach((sat) => {

            if (sat.gp) {
                const mapSat = {
                    name: sat.satname,
                    tle: [
                        // sat.gp.tle_line0,
                        sat.gp.tle_line1,
                        sat.gp.tle_line2,
                    ]
                }

                const entity = new SatelliteEntityWrapper(this.viewer, mapSat);
                this.satellites.push(entity);
            }
        });
    }
}
