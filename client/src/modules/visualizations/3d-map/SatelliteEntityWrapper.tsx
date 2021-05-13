import {
    BillboardGraphics,
    Cartesian2,
    Color,
    HorizontalOrigin,
    LabelGraphics,
    PathGraphics,
    SampledPositionProperty,
    VelocityOrientationProperty,
    Viewer
} from 'cesium';
import { CesiumEntityWrapper } from './CesiumEntityWrapper';
import { SatelliteProperties } from './SatelliteProperties';
import { config } from '../../../../app.config';

interface Satellite {
    name: string;
    tle: string[];
}

export class SatelliteEntityWrapper extends CesiumEntityWrapper {
    satellite:      Satellite;
    props:          SatelliteProperties;
    entities:       any = {};
    defaultEntity:  object;
    description:    any;

    constructor(viewer: Viewer, satellite: Satellite) {
        super(viewer);
        this.satellite = satellite;
        this.props = new SatelliteProperties(satellite);

        this.entities = {};
        this.defaultEntity = this.entities.point;

        this.createEntities();

        // By default, use the INERTIAL reference frame
        this.referenceFrameInertial();
        super.enableComponent("Billboard");
        super.enableComponent("Label");
        super.enableComponent("CurrentInertialOrbit");

        this.viewer.selectedEntityChanged.addEventListener(() => {
            if (this.isSelected && !super.componentExists("CurrentInertialOrbit")) {
                super.enableComponent("CurrentInertialOrbit");
            } else if (this.isSelected && super.componentExists("CurrentInertialOrbit")) {
                super.disableComponent("CurrentInertialOrbit");
            } else if (this.isSelected) {
                super.enableComponent("CurrentInertialOrbit");
            }
        })
    }

    createCesiumSatelliteEntity(entityName: string, entityKey: string, entityValue: any) {
        this.createCesiumEntity(entityName, entityKey, entityValue, this.satellite.name, this.satellite.name, this.props.sampledPosition, true);
    }

    createEntities() {
        this.createBillboard();
        this.createLabel();
        this.createCurrentOrbit();
        this.createPreviousOrbit();
        this.createFlownOrbit();
        this.createInertialCurrentOrbit();
    }

    createLabel() {
        const label = new LabelGraphics({
            text: this.satellite.name,
            horizontalOrigin: HorizontalOrigin.LEFT,
            pixelOffset: new Cartesian2(3, -5),
            font: '14px Inter',
            scale: .95
        });

        this.createCesiumSatelliteEntity("Label", "label", label);
    }

    referenceFrameInertial() {
        this.props.createSampledPosition(this.viewer.clock, 'Inertial', (sampledPosition: any) => {
            Object.entries(this.entities).forEach(([type, entity]: [string, any]) => {
                if (type === 'Billboard' || type === 'Label') {
                    entity.position = sampledPosition;
                    entity.orientation = new VelocityOrientationProperty(sampledPosition);
                }
            })
        });
    }

    referenceFrameFixed() {
        this.props.createSampledPosition(this.viewer.clock, 'Fixed', (sampledPosition: any) => {
            Object.entries(this.entities).forEach(([type, entity]: [string, any]) => {
                if (type === 'Billboard' || type === 'Label') {
                    entity.position = sampledPosition;
                    entity.orientation = new VelocityOrientationProperty(sampledPosition);
                }
            })
        });
    }

    createBillboard() {
        const billboard = new BillboardGraphics({
            image: `${config.url.APP_URL}/assets/icons/point.svg`
        })

        this.createCesiumSatelliteEntity("Billboard", "billboard", billboard);
    }

    createInertialCurrentOrbit() {
        const orbit = this.props.generateInertialCurrentOrbit();
        const leadTime = (this.props.orbit.orbitalPeriod * 60);
        const trailTime = (this.props.orbit.orbitalPeriod * 60);

        this.constructOrbitPath(orbit, leadTime, trailTime, '#2377B3', 'CurrentInertialOrbit');

        // const path = new PathGraphics({
        //     leadTime: (this.props.orbit.orbitalPeriod * 60) / 2 + 5,
        //     trailTime: (this.props.orbit.orbitalPeriod * 60) / 2 + 5,
        //     material: Color.fromCssColorString('#2377B3'),
        //     resolution: 600,
        //     width: 2
        // });

        // this.createCesiumEntity("CurrentInertialOrbit", "path", path, this.props.satellite.name, this.description, this.props.sampledPosition, true);

        // this.props.createSampledPosition(this.viewer.clock, 'Inertial', (sampledPosition: any) => {
        //     Object.entries(this.entities).forEach(([type, entity]: [string, any]) => {
        //         if (type === 'CurrentInertialOrbit') {
        //             entity.position = this.props.sampledPosition;
        //             entity.orientation = new VelocityOrientationProperty(this.props.sampledPosition);
        //         }
        //     });
        // });
    }

    createCurrentOrbit() {
        const orbit = this.props.generateCurrentOrbit();
        const leadTime = this.props.orbit.orbitalPeriod * 60;
        const trailTime = 0;

        this.constructOrbitPath(orbit, leadTime, trailTime, '#2377B3', 'CurrentOrbit');
    }

    createFlownOrbit() {
        const orbit = this.props.generateCurrentOrbit();
        const leadTime = 0;
        const trailTime = this.props.orbit.orbitalPeriod * 60;

        this.constructOrbitPath(orbit, leadTime, trailTime, '#7E8C95', 'CurrentFlownOrbit');
    }

    createPreviousOrbit() {
        const orbit = this.props.generatePreviousOrbit();
        const leadTime = this.props.orbit.orbitalPeriod;
        const trailTime = this.props.orbit.orbitalPeriod * 40;

        this.constructOrbitPath(orbit, leadTime, trailTime, '#7E8C95', 'PreviousOrbit');
    }

    constructOrbitPath(orbit: SampledPositionProperty, leadTime: number = 0, trailTime: number = 0, color: string = '#000', name: string) {
        const orbitPath = new PathGraphics({
            leadTime,
            trailTime,
            material: Color.fromCssColorString(color),
            width: 1.5
        });

        this.createCesiumEntity(name, "path", orbitPath, this.satellite.name, this.satellite.name, orbit, true);
    }

    changeReferenceFrame(frame: string) {
        if (frame === 'Fixed') {
            this.referenceFrameFixed();
            super.disableComponent("CurrentInertialOrbit");
            super.enableComponent("CurrentOrbit");
            super.enableComponent("PreviousOrbit");
            super.enableComponent("CurrentFlownOrbit");
        } else if (frame === 'Inertial') {
            this.referenceFrameInertial();
            super.enableComponent("CurrentInertialOrbit");
            super.disableComponent("CurrentOrbit");
            super.disableComponent("PreviousOrbit");
            super.disableComponent("CurrentFlownOrbit");
        }
    }
}
