import { Link } from 'react-router-dom';
import gradient from '../../vendor/gradient';
import { useEffect } from 'react';

export const Welcome: React.FC = () => {
    useEffect(() => {
        gradient.initGradient('#gradient-canvas');
    })

    return (
        <>
            <canvas id="gradient-canvas" data-js-darken-top data-transition-in className="w-full absolute left-0 transform -skew-y-12" style={{ height: '600px', top: '-210px' }}></canvas>
            <div className="px-4 md:px-7">
                <div className="mt-24 max-w-2xl">
                    <div className="relative">
                        <h1 className="lg:text-7xl text-5xl font-semibold mix-blend-color-burn leading-tight">One-click<br />orbital dynamics</h1>
                        <h1 className="lg:text-7xl text-5xl font-semibold leading-tight opacity-90 absolute top-0 z-10">One-click<br />orbital dynamics</h1>
                    </div>
                    <p className="my-3 text-lg tracking-wide">
                        Rocket hunters, hobbyists and simple opportunists use Orbitcluster's software to spot satellite passes in real life, intuitively view a complete satellite database, learn about the history of various objects orbiting Earth and understand complex topics like orbital mechanics.
                    </p>
                    <div className="pt-4">
                        <Link to="/satellites" className="bg-primary-800 hover:bg-primary-700 text-white py-3 px-5 rounded transition">Explore Satellites</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
