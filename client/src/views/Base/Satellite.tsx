import React from "react";
import { withRouter } from "react-router-dom";

class Satellite extends React.Component<any, any> {
    state = {
        satellite: {
            satname: null,
            norad_cat_id: null,
            intldes: null,
            satdata: [{
                description: null
            }]
        }
    }

    async getSatellite(id: string): Promise<any> {
        const res = await fetch(`http://localhost:4000/v1/satellite`, {
            method: 'post',
            body: JSON.stringify({ id }),
        });

        const json = await res.json();

        this.setState({
            satellite: json,
        });
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.getSatellite(id);
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h2>{this.state.satellite.satname}</h2>
                    <span>{this.state.satellite.norad_cat_id} / {this.state.satellite.intldes}</span>
                    {this.state.satellite?.satdata[0]?.description && (
                        <p className="text-small mt-4">
                            {this.state.satellite.satdata[0].description}
                        </p>
                    )}
                </div>
            </div>
        )
    }
}

export default withRouter(Satellite);
