import {
    Cartesian3,
    Cartographic,
    Clock,
    ExtrapolationType,
    JulianDate,
    LagrangePolynomialApproximation,
    Math as CesiumMath,
    ReferenceFrame,
    SampledPositionProperty,
} from 'cesium';
import { Orbit } from './Orbit';

interface Satellite {
    name: string;
    tle: string[];
}

export class SatelliteProperties {
    satellite:                  Satellite;
    orbit:                      Orbit;
    cartographic:               any;
    lastPosition:               Cartesian3 | undefined;
    lastDate:                   JulianDate | undefined;
    sampledPosition:            any;
    sampledPositionInertial:    any;
    orbitStep:                  number = 60000;

    constructor(satellite: Satellite) {
        this.satellite = satellite;
        this.orbit = new Orbit(satellite);
    }

    position(time: Date) {
        return this.sampledPosition.getValue(time);
    }

    positionCartographic(time: Date) {
        return Cartographic.fromCartesian(this.position(time));
    }

    positionCartographicDegrees(time: Date) {
        const cartographic = this.positionCartographic(time);
        const cartographicDegrees = {
            longitude: CesiumMath.toDegrees(cartographic.longitude),
            latitude: CesiumMath.toDegrees(cartographic.latitude),
            height: cartographic.height
        }

        return cartographicDegrees;
    }

    get height() {
        return this.cartographic.height;
    }

    computePositionCartesian3(julianDate: JulianDate) {
        if (this.lastDate) {
            if (typeof this.lastPosition !== 'undefined' && JulianDate.compare(this.lastDate, julianDate) === 0) {
                return this.lastPosition;
            }
        }

        this.lastDate = julianDate;
        const { longitude, latitude, height } = this.orbit.positionGeodetic(JulianDate.toDate(julianDate));
        this.lastPosition = Cartesian3.fromRadians(longitude, latitude, height);

        return this.lastPosition;
    }

    computePositionCartographicDegrees(julianDate: JulianDate) {
        const { longitude, latitude, height, velocity } = this.orbit.positionGeodeticWithVelocity(JulianDate.toDate(julianDate));
        const cartographicDegrees = {
            longitude: CesiumMath.toDegrees(longitude),
            latitude: CesiumMath.toDegrees(latitude),
            height,
            velocity
        };

        return cartographicDegrees;
    }

    positionInertial(time: JulianDate, constprop: boolean = false) {
        const eci = this.orbit.positionECI(JulianDate.toDate(time));
        let position = new Cartesian3(0, 0, 0);

        if (typeof eci !== 'boolean') {
            position = new Cartesian3(eci.x * 1000, eci.y * 1000, eci.z * 1000);
        }

        return position;
    }

    createSampledPosition(clock: Clock, reference: string = 'Inertial', callback: any) {
        let lastUpdated: JulianDate;
        lastUpdated = this.updateSampledPosition(clock.currentTime, reference);
        callback(this.sampledPosition);

        clock.onTick.addEventListener((onTickClock) => {
            const dt = Math.abs(JulianDate.secondsDifference(onTickClock.currentTime, lastUpdated));
            if (dt >= 60 * 15) {
                lastUpdated = this.updateSampledPosition(onTickClock.currentTime, reference);
                callback(this.sampledPosition);
            }
        });
    }

    updateSampledPosition(julianDate: JulianDate, referenceFrame: string, samplesFwd: number = 240, samplesBwd: number = 120, interval: number = 30) {
        if (referenceFrame === 'Fixed') {
            const sampledPosition = new SampledPositionProperty();
            sampledPosition.backwardExtrapolationType = ExtrapolationType.HOLD;
            sampledPosition.forwardExtrapolationType = ExtrapolationType.HOLD;
            sampledPosition.setInterpolationOptions({
                interpolationDegree: 5,
                interpolationAlgorithm: LagrangePolynomialApproximation
            });

            const offset = Math.random() * 60 * 15;
            const reference = JulianDate.addSeconds(julianDate, offset, new JulianDate());

            const startTime = -samplesBwd * interval;
            const stopTime = samplesFwd * interval;

            for (let time = startTime; time <= stopTime; time += interval) {
                const timestamp = JulianDate.addSeconds(reference, time, new JulianDate());
                const position = this.computePositionCartesian3(timestamp);
                sampledPosition.addSample(timestamp, position);
            }

            this.sampledPosition = sampledPosition;

            return reference;
        } else { // Fall back to Inertial frame
            const sampledPosition = new SampledPositionProperty(ReferenceFrame.INERTIAL);
            sampledPosition.backwardExtrapolationType = ExtrapolationType.HOLD;
            sampledPosition.forwardExtrapolationType = ExtrapolationType.HOLD;
            sampledPosition.setInterpolationOptions({
                interpolationDegree: 5,
                interpolationAlgorithm: LagrangePolynomialApproximation
            });

            const offset = Math.random() * 60 * 15;
            const reference = JulianDate.addSeconds(julianDate, offset, new JulianDate());

            const startTime = -samplesBwd * interval;
            const stopTime = samplesFwd * interval;

            for (let time = startTime; time <= stopTime; time += interval) {
                const timestamp = JulianDate.addSeconds(reference, time, new JulianDate());
                const positionInertial = this.positionInertial(timestamp);
                sampledPosition.addSample(timestamp, positionInertial);
            }

            this.sampledPosition = sampledPosition;

            return reference;
        }
    }

    generateInertialCurrentOrbit(n: number = 10, step: number = 60000) {
        let orbit = new SampledPositionProperty(ReferenceFrame.INERTIAL);
        orbit.backwardExtrapolationType = ExtrapolationType.HOLD;
        orbit.forwardExtrapolationType = ExtrapolationType.HOLD;
        orbit.setInterpolationOptions({
            interpolationDegree: 5,
            interpolationAlgorithm: LagrangePolynomialApproximation
        });

        const now = Date.now();
        const start = now;
        const stop = now + ((this.orbit.orbitalPeriod * 60000) * n);

        for (let t = start; t <= stop; t += step) {
            const timestamp = JulianDate.fromDate(new Date(t));
            const position = this.positionInertial(timestamp);
            orbit.addSample(timestamp, position);
        }

        return orbit;
    }

    generateCurrentOrbit(n: number = 10, step: number = 60000) {
        let orbit = new SampledPositionProperty();
        orbit.backwardExtrapolationType = ExtrapolationType.HOLD;
        orbit.forwardExtrapolationType = ExtrapolationType.HOLD;
        orbit.setInterpolationOptions({
            interpolationDegree: 5,
            interpolationAlgorithm: LagrangePolynomialApproximation
        });

        const now = Date.now();
        const start = now;
        const stop = now + ((this.orbit.orbitalPeriod * 60000) * n);

        for (let t = start; t <= stop; t += step) {
            const timestamp = JulianDate.fromDate(new Date(t));
            const position = this.computePositionCartesian3(timestamp);
            orbit.addSample(timestamp, position);
        }

        return orbit;
    }

    generatePreviousOrbit(step: number = 60000) {
        let orbit = new SampledPositionProperty();
        orbit.backwardExtrapolationType = ExtrapolationType.HOLD;
        orbit.forwardExtrapolationType = ExtrapolationType.HOLD;
        orbit.setInterpolationOptions({
            interpolationDegree: 5,
            interpolationAlgorithm: LagrangePolynomialApproximation
        });

        const now = Date.now();
        const start = now;
        const stop = now - (this.orbit.orbitalPeriod * this.orbitStep);

        for (let t = start; t >= stop; t -= step) {
            const timestamp = JulianDate.fromDate(new Date(t));
            const position = this.computePositionCartesian3(timestamp);
            orbit.addSample(timestamp, position);
        }

        return orbit;
    }
}
