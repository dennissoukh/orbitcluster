import { Component } from 'react';
import { JulianDate, Viewer } from 'cesium';
import CesiumController from './CesiumController';
import CesiumContext from './CesiumContext';
import { Controller } from './Viewer';
import { timestampToReadableTime } from '../../../lib/date';

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
        }
        this.timeInterval = setInterval(() => this.setState({ time: this.getCesiumTime() }), 1000);
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
        let date: any = '00:00:00';

        date = timestampToReadableTime(new Date());

        return date;
    }

    render() {
        return (
            <div className="absolute bottom-0 left-0 right-0 bg-primary-900 bg-opacity-80 flex py-4">
                <div className="max-w-1470 ml-auto mr-auto flex w-full">
                    <div>
                        <span className="text-sm uppercase text-primary-200">Reference Frame</span>
                        <div>
                            <button onClick={this.changeReferenceFrame} className="text-lg">{this.state.referenceFrame}</button>
                        </div>
                    </div>
                    <div className="ml-6">
                        <span className="text-sm uppercase text-primary-200">Animation Time</span>
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
                    {/* <div className="right">
                        <div>
                            <span className="small">TARGET</span>
                            <p className="large">{this.state.name ? this.state.name : 'N/A'}</p>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}

CesiumControls.contextType = CesiumContext;
