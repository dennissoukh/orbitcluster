import { Component, createRef } from 'react';
import { Clock, Globe, Scene, Viewer } from 'resium';
import { satellite } from '../../../types/satellite';
import CesiumContext from './CesiumContext';
import CesiumController from './CesiumController';

export let Controller: CesiumController;

export default class ViewerComponent extends Component<{ satellites: Array<satellite> }> {
    ref: any;

    constructor(props: any) {
        super(props);
        this.ref = createRef();
    }

    componentDidMount() {
        if (this.ref.current && this.ref.current.cesiumElement) {
            this.context.setInstance(this.ref.current.cesiumElement);

            // Create a controller for the Cesium instance
            console.log(this.props.satellites)
            Controller = new CesiumController(this.ref.current.cesiumElement, this.props.satellites);

            // Create a higher resolution skybox
            // this.ref.current.cesiumElement.scene.skyBox = new SkyBox({
            //     sources: {
            //         positiveX: 'http://localhost:3000/skybox/TychoSkymapII.t3_08192x04096_80_px_HD.jpg',
            //         negativeX: 'http://localhost:3000/skybox/TychoSkymapII.t3_08192x04096_80_mx_HD.jpg',
            //         positiveY: 'http://localhost:3000/skybox/TychoSkymapII.t3_08192x04096_80_py_HD.jpg',
            //         negativeY: 'http://localhost:3000/skybox/TychoSkymapII.t3_08192x04096_80_my_HD.jpg',
            //         positiveZ: 'http://localhost:3000/skybox/TychoSkymapII.t3_08192x04096_80_pz_HD.jpg',
            //         negativeZ: 'http://localhost:3000/skybox/TychoSkymapII.t3_08192x04096_80_mz_HD.jpg',
            //     }
            // });
        }
    }

    render() {
        return (
            <>
                <Viewer
                    ref={this.ref}
                    fullscreenButton={false}
                    homeButton={false}
                    navigationHelpButton={false}
                    navigationInstructionsInitiallyVisible={false}
                    sceneModePicker={false}
                    timeline={false}
                    vrButton={false}
                    scene3DOnly
                    geocoder={false}
                    baseLayerPicker={false}
                    projectionPicker={false}
                    selectionIndicator={false}
                    infoBox={false}

                >
                    <Scene/>
                    <Globe
                        enableLighting
                        nightFadeInDistance={1.0e3}
                        nightFadeOutDistance={1.0e3}
                        lightingFadeInDistance={1.0e3}
                        lightingFadeOutDistance={1.0e3}
                        atmosphereBrightnessShift={-0.15}
                    />
                    <Clock
                        shouldAnimate={true}
                    />
                </Viewer>
                {/* <CesiumControls/> */}
            </>
        )
    }
}

ViewerComponent.contextType = CesiumContext;
