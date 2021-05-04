import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { SatellitePassItem } from "./SatellitePassItem";

export const Passes: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [passes, setPasses] = useState([]);

    useEffect(() => {
        const getPasses = async () => {
            const url = `http://localhost:4000/v1/passes/${id}`;
            const res = await fetch(url, {
                method: 'POST',
                // headers: {
                //     'Accept': 'application/json, text/plain, */*',
                //     'Content-Type': 'application/json'
                // },
                body: JSON.stringify({
                    alt: 60,
                    lat: 53.1,
                    lon: -8.98,
                })
            });
            const data = await res.json();
            setPasses(data.data)
        }

        getPasses();
    }, [id]);

    return (
        <div className="px-4 md:px-6 py-5">
            <div className="flex items-center bg-secondary text-sm border-gray border-solid border p-3 rounded-lg">
                <div className="w-9 mx-5">
                    <span>Date</span>
                </div>
                <div className="w-9 mx-5">
                    <span>Brightness</span>
                </div>
                <div className="w-5l mx-5">
                    <div className="text-center">
                        <span>Start</span>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            Time
                        </div>
                        <div>
                            Alt.
                        </div>
                        <div>
                            Az.
                        </div>
                    </div>
                </div>
                <div className="mx-5 w-5l">
                    <div className="text-center">
                        <span>Highest Point</span>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            Time
                        </div>
                        <div>
                            Alt.
                        </div>
                        <div>
                            Az.
                        </div>
                    </div>
                </div>
                <div className="w-5l mx-5">
                    <div className="text-center">
                        <span>End</span>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            Time
                        </div>
                        <div>
                            Alt.
                        </div>
                        <div>
                            Az.
                        </div>
                    </div>
                </div>
                <div className="w-9 mx-5">
                    <span>Pass Type</span>
                </div>
            </div>
            <div className="p-3">
                {passes && passes.map((pass: any, index: number) => {
                    return (
                        <SatellitePassItem pass={pass} key={index}/>
                    )
                })}
                {!passes &&
                    <p>No available passes for this satellite</p>
                }
            </div>
        </div>
    )
}
