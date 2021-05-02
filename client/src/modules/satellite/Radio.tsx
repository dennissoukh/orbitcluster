import { radio } from '../../types/satellite'
import { Callout } from '../../components/Callout';

interface RadioProps {
    radio: Array<radio>,
}

export const Radio: React.FC<RadioProps> = ({ radio }) => {
    return (
        <div className="mt-5">
            {radio.map((item: radio, index: number) => {
                return (
                    <div className="flex mt-4" key={index}>
                        <div>
                            <div className={item.type === 'inactive'
                                ? 'h-1.5 w-1.5 bg-gray rounded-full mr-3'
                                : 'h-1.5 w-1.5 bg-green rounded-full mr-3'
                            } style={{ marginTop: '9px' }}></div>
                        </div>
                        <div className="w-1/6">
                            {item.uplink &&
                                <Callout title="Uplink" content={item.uplink} styles="mr-3"/>
                            }
                        </div>
                        <div className="w-1/6">
                            {item.downlink &&
                                <Callout title="downlink" content={item.downlink} styles="mr-3"/>
                            }
                        </div>
                        <div className="w-1/6">
                            {item.beacon &&
                                <Callout title="beacon" content={item.beacon} styles="mr-3"/>
                            }
                        </div>
                        <div className="w-1/6">
                            {item.mode &&
                                <Callout title="mode" content={item.mode} styles="mr-3"/>
                            }
                        </div>
                        <div className="w-1/6">
                            {item.callsign &&
                                <Callout title="callsign" content={item.callsign} styles="mr-3"/>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
