import { createRef, Component } from 'react';
import { Clock, Globe, Scene, Viewer as ResiumViewer } from 'resium';
import CesiumContext from './CesiumContext';

class Viewer extends Component {
    ref: any;

    constructor(props: any) {
        super(props);
        this.ref = createRef();
    }

    componentDidMount() {
        if (this.ref.current && this.ref.current.cesiumElement) {
            this.context.setInstance(this.ref.current.cesiumElement);
        }
    }

    render() {
        return (
            <ResiumViewer
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
            </ResiumViewer>
        )
    }
};

Viewer.contextType = CesiumContext;

export default Viewer;
