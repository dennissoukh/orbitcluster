import React from 'react';

export const Loading: React.FC = () => {
    return (
        <>
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-primary-800">
                <div className="max-w-1470 ml-auto mr-auto px-4 md:px-6 mt-24">
                    <div className="flex items-center">
                        <div>
                            <svg width="100" height="100" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                                <g fill="none" fillRule="evenodd">
                                    <g transform="translate(1 1)" strokeWidth="2">
                                        <circle strokeOpacity=".5" cx="18" cy="18" r="18"/>
                                        <path d="M36 18c0-9.94-8.06-18-18-18">
                                            <animateTransform
                                                attributeName="transform"
                                                type="rotate"
                                                from="0 18 18"
                                                to="360 18 18"
                                                dur="1s"
                                                repeatCount="indefinite"/>
                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div>
                        <h1 className="text-lg md:text-5xl ml-5">Computing Simulation &amp; <br/> Object Trajectories</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
