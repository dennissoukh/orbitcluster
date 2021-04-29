import React from 'react';
import { satellite } from '../../types/satellite';
import { Callout } from '../../components/Callout';
import { timestampToReadableDate } from '../../lib/date';
import { processLineBreaks } from '../../lib/string';

interface DetailsProps {
    satellite: satellite,
};

export const Details: React.FC<DetailsProps> = ({ satellite }) => {
    return (
        <div>
            <div className="mt-5">
                <div className="flex flex-wrap overflow-hidden">
                    <div className="w-1/2">
                        <Callout
                            title="NORAD CAT ID"
                            content={satellite.norad_cat_id}
                        />
                    </div>
                    <div className="w-1/2">
                        <Callout
                            title="Object ID"
                            content={satellite.intldes}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap overflow-hidden mt-4">
                    <div className="w-1/2">
                        <Callout
                            title="Object Type"
                            content={satellite.object_type}
                        />
                    </div>
                    <div className="w-1/2">
                        <Callout
                            title="Country"
                            content={satellite.country}
                            link={`/operator/${satellite.country}`}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap overflow-hidden mt-4">
                    <div className="w-1/2">
                        <Callout
                            title="Launch Site"
                            content={satellite.site}
                            link={`/launch-site/${satellite.site}`}
                        />
                    </div>
                    <div className="w-1/2">
                        <Callout
                            title="Launch Date"
                            content={timestampToReadableDate(satellite.launch)}
                        />
                    </div>
                </div>
            </div>

            {satellite.data &&
                <>
                    {satellite.data.operator_owner &&
                        <Callout
                            title="Operator"
                            content={`${satellite.data.operator_owner} (${satellite.data.users})`}
                            styles="mt-4"
                        />
                    }
                    {satellite.data.purpose &&
                        <Callout
                            title="Purpose"
                            content={`${satellite.data.purpose} ${satellite.data.detailed_purpose ? `(${satellite.data.detailed_purpose})` : ''}`}
                            styles="mt-4"
                        />
                    }
                    {satellite.data.launch_vehicle &&
                        <Callout
                            title="Launch Vehicle"
                            content={`${satellite.data.launch_vehicle}`}
                            styles="mt-4"
                        />
                    }
                    {satellite.data.contractor &&
                        <Callout
                            title="Contractor"
                            content={`${satellite.data.contractor} (${satellite.data.contractor_country})`}
                            styles="mt-4"
                        />
                    }
                    {satellite.data.comments &&
                        <Callout
                            title="Comments"
                            content={`${satellite.data.comments}`}
                            styles="mt-4"
                        />
                    }
                </>
            }

            {satellite.data?.description &&
                <Callout
                    title="Description"
                    content={processLineBreaks(satellite.data.description)}
                    styles="mt-4"
                />
            }
        </div>
    )
};
