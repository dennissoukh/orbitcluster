import { Viewer } from 'cesium';
import { satellite } from '../../../types/satellite';
import { SatelliteManager } from './SatelliteManager';

enum referenceFrame {
    FIXED = 'Fixed',
    INERTIAL = 'Inertial'
}

export default class CesiumController {
    viewer:                 Viewer;
    satelliteManager:       SatelliteManager;
    activeReferenceFrame:   referenceFrame = referenceFrame.FIXED;
    activeFramerate:        number = 30;
    activeEntity:           any;

    constructor(viewer: Viewer, satellites: Array<satellite>) {
        this.viewer = viewer;
        this.activeReferenceFrame = referenceFrame.FIXED;

        this.viewer.selectedEntityChanged.addEventListener((entity) => {
            this.activeEntity = entity;
        });

        this.satelliteManager = new SatelliteManager(this.viewer, satellites);
    }

    referenceFrame(frame: string) {
        switch (frame) {
            case 'Fixed':
                this.activeReferenceFrame = referenceFrame.FIXED;
                this.satelliteManager.satellites.forEach(sat => {
                    sat.changeReferenceFrame('Fixed');
                });
                break;
            case 'Inertial':
                this.activeReferenceFrame = referenceFrame.INERTIAL;
                this.satelliteManager.satellites.forEach(sat => {
                    sat.changeReferenceFrame('Inertial');
                });
                break;
            default:
                throw Error('The reference frame provided does not exist');
        }
    }
}
