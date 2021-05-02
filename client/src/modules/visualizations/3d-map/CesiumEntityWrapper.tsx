import { Entity, VelocityOrientationProperty, Viewer } from 'cesium';

export class CesiumEntityWrapper {
    viewer: Viewer;
    entities: any = {};

    constructor(viewer: Viewer) {
        this.viewer = viewer;
    }

    createCesiumEntity(
        entityName: any,
        entityKey: any,
        entityValue: any,
        name: any,
        description: any,
        position: any,
        moving: boolean,
    ) {
        const entity: {[index: string]: any} = new Entity({
            name,
            description,
            position
        });

        if (moving) {
            entity.orientation = new VelocityOrientationProperty(position);
        }

        entity[entityKey] = entityValue;
        this.entities[entityName] = entity;
    }

    componentExists(name : string) {
        return !!(name in this.entities && this.viewer.entities.contains(this.entities[name]));
    }

    enableComponent(name: string) {
        if (name in this.entities && !this.viewer.entities.contains(this.entities[name])) {
            this.viewer.entities.add(this.entities[name]);
        }
    }

    disableComponent(name: string) {
        if (name in this.entities && this.viewer.entities.contains(this.entities[name])) {
            this.viewer.entities.remove(this.entities[name]);
        }
    }

    get isSelected() {
        return Object.values(this.entities).some((entity) => this.viewer.selectedEntity === entity);
    }

    get isTracked() {
        return Object.values(this.entities).some((entity) => this.viewer.trackedEntity === entity);
    }
}
