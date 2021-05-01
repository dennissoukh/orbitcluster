import { Component } from 'react';
import { satellite } from '../../../types/satellite';
import CesiumContext, { state } from './CesiumContext';
import Viewer from './Viewer';

interface MapperState {
    satellites: Array<satellite>
}

export class Mapper extends Component<{ location: any }, MapperState> {
    constructor(props: any) {
        super(props);
        this.state = {
            satellites: [],
        };
    }

    componentDidMount() {
        if (this.props.location.search) {
            fetch(`http://localhost:4000/v1/orbit${this.props.location.search}`)
                .then((res) => res.json())
                .then((data) => {
                    const exists = (el: any) => el._id === data.data._id;
                    if (!this.state.satellites.some(exists)) {
                        this.setState((state) => {
                            return { satellites: [...state.satellites, data.data] }
                        });
                    }
                });
        }
    }

    render() {
        return this.state.satellites.length && (
            <>
                <CesiumContext.Provider value={state}>
                    <Viewer satellites={this.state.satellites}/>
                </CesiumContext.Provider>
            </>
        )
    }
}

