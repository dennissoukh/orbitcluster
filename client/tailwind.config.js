module.exports = {
    purge: ['./src/**/*.tsx', './public/index.html'],
    darkMode: 'class',
    theme: {
        fontFamily: {
            sans: [
                'Inter',
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Roboto',
                'Helvetica',
                'Arial',
                'sans-serif',
            ]
        },
        colors: {
            button: 'var(--color-base)',
            transparent: 'transparent',
            primary: 'var(--color-black)',
            secondary: 'var(--color-dark-gray)',
            tertiary: 'var(--color-gray)',
            'gray': 'var(--color-dark-gray-2)',
            'light-gray': 'var(--color-light-gray)',
            'muted': 'var(--color-type-mute)',
            'white': 'var(--color-white)',
            red: 'var(--color-red)',
            green: 'var(--color-green)',
        },
        fontSize: {
            tiny: '0.625rem',
            xs: '.75rem',
            sm: '.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',
        },
        spacing: {
            0: '0px',
            1: '5px',
            1.5: '6px',
            2: '10px',
            3: '15px',
            4: '20px',
            5: '30px',
            6: '40px',
            7: '60px',
            8: '75px',
            9: '80px',
            '5l': '10rem',
            'n1/2': '-50%',
            24: '24rem',
            400: '400px',
        },
        borderWidth: {
            DEFAULT: '1px',
            0: '0px',
            2: '2px',
        },
        extend: {
            borderRadius: {
                5: '5px',
                8: '8px',
            },
            outline: {
                'no-chrome': 'none'
            },
            width: {
                '30': '30px',
                '300': '300px',
            },
            height: {
                '30': '30px',
            },
            minWidth: {
                '300': '300px',
            }
        },
        // screens: {
        //     'sm': '640px',
        //     'md': '768px',
        //     'lg': '1024px',
        //     'xl': '1280px',
        //     '2xl': '1536px',
        // }
    },
    variants: {
        scrollBar: ['rounded', 'dark']
    },
    plugins: [],
}
