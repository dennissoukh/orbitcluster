import { Component } from 'react';
import { JulianDate, Viewer } from 'cesium';
import CesiumController from './CesiumController';
import CesiumContext from './CesiumContext';
import { Controller } from './Viewer';

export default class CesiumControls extends Component<{}, { [key: string]: any }> {
    controller:     CesiumController | undefined;
    viewer:         Viewer | undefined;
    activeEntity:   any;
    timeInterval:   any;

    constructor(props: any) {
        super(props);
        this.changeReferenceFrame = this.changeReferenceFrame.bind(this);
        this.getCesiumTime = this.getCesiumTime.bind(this);
        this.state = {
            name: '',
            referenceFrame: 'Inertial',
            time: '00:00:00',
            activeSat: {
                velocity: null,
                altitude: null,
                inclination: null
            }
        }
    }

    componentDidMount() {
        this.viewer = this.context.viewer;
        if (this.viewer) {
            this.controller = Controller;
            this.viewer.selectedEntityChanged.addEventListener((entity) => {
                this.activeEntity = entity;
                this.setState({name: this.activeEntity?._name});
            });
            this.timeInterval = setInterval(() => this.setState({ time: this.getCesiumTime() }), 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timeInterval);
    }

    changeReferenceFrame() {
        if (this.controller?.activeReferenceFrame === 'Fixed') {
            this.setState({ referenceFrame: 'Inertial' });
            this.controller.referenceFrame('Inertial');
        } else if (this.controller?.activeReferenceFrame === 'Inertial') {
            this.setState({ referenceFrame: 'Fixed' });
            this.controller.referenceFrame('Fixed');
        }
    }

    getCesiumTime() {
        const zeroPad = (num: number, places: number) => String(num).padStart(places, '0');
        let date: any = '00:00:00';

        if (this.viewer?.clock.currentTime) {
            date = JulianDate.toGregorianDate(this.viewer.clock.currentTime);
        }

        return `${zeroPad(date.hour, 2)}:${zeroPad(date.minute, 2)}:${zeroPad(date.second, 2)}`;
    }

    render() {
        return (
            <div className="controls">
                <div className="left">
                    <div>
                        <span className="small">REFERENCE FRAME</span>
                        <p className="large" onClick={this.changeReferenceFrame}>{this.state.referenceFrame}</p>
                    </div>
                    {/* <div>
                        <span className="small">SHOW PREVIOUS ORBIT</span>
                        <p className="large">Yes</p>
                    </div> */}
                    <div>
                        <span className="small">ANIMATION TIME</span>
                        <p className="large">{this.state.time}</p>
                    </div>
                    {/* <div>
                        <span className="small">ANIMATION FPS</span>
                        <p className="large">76</p>
                    </div> */}
                    {/* <div>
                        <span className="small">VELOCITY</span>
                        <p className="large">N/A</p>
                    </div>
                    <div>
                        <span className="small">ALTITUDE</span>
                        <p className="large">N/A</p>
                    </div>
                    <div>
                        <span className="small">INCLINATION</span>
                        <p className="large">N/A</p>
                    </div> */}
                </div>
                <div className="right">
                    <div>
                        <span className="small">TARGET</span>
                        <p className="large">{this.state.name ? this.state.name : 'N/A'}</p>
                    </div>
                </div>
            </div>
        )
    }
}

CesiumControls.contextType = CesiumContext;
