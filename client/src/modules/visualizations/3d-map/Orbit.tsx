import {
    eciToEcf,
    eciToGeodetic,
    gstime,
    propagate,
    SatRec,
    twoline2satrec,
} from 'satellite.js';

interface Satellite {
    name: string;
    tle: string[];
}

export class Orbit {
    satellite: Satellite;
    satrec: SatRec;

    constructor(satellite: Satellite) {
        this.satellite = satellite;
        this.satrec = twoline2satrec(satellite.tle[0], satellite.tle[1]);
    }

    get satnum() {
        return this.satrec.satnum;
    }

    get orbitalPeriod() {
        const meanMotionRad = this.satrec.no;
        const period = (2 * Math.PI) / meanMotionRad;
        return period;
    }

    positionECI(time: Date) {
        return propagate(this.satrec, time).position;
    }

    positionECF(time: Date) {
        const positionEci = this.positionECI(time);
        const gmst = gstime(time);

        let position = {
            x: 0,
            y: 0,
            z: 0
        }

        if (typeof positionEci !== 'boolean') {
            position = eciToEcf(positionEci, gmst);
        }

        return position;
    }

    positionGeodetic(time: Date) {
        const positionEci = this.positionECI(time);
        const gmst = gstime(time);

        let position = {
            longitude: 0,
            latitude: 0,
            height: 0
        }

        if (typeof positionEci !== 'boolean') {
            let positionGd = eciToGeodetic(positionEci, gmst);

            position = {
                longitude: positionGd.longitude,
                latitude: positionGd.latitude,
                height: positionGd.height * 1000
            }
        }

        return position;
    }

    positionGeodeticWithVelocity(timestamp: Date) {
        const positionAndVelocity = propagate(this.satrec, timestamp);
        const positionEci = positionAndVelocity.position;
        const velocityEci = positionAndVelocity.velocity;

        const gmst = gstime(timestamp);

        let positionVelocity = {
            longitude: 0,
            latitude: 0,
            height: 0,
            velocity: 0
        }

        if ((typeof positionEci !== 'boolean') && (typeof velocityEci !== 'boolean')) {
            const positionGd = eciToGeodetic(positionEci, gmst);
            const velocity = Math.sqrt(
                velocityEci.x * velocityEci.x +
                velocityEci.y * velocityEci.y +
                velocityEci.z * velocityEci.z
            );

            positionVelocity = {
                longitude: positionGd.longitude,
                latitude: positionGd.latitude,
                height: positionGd.height * 1000,
                velocity
            }
        }

        return positionVelocity;
    }
}
