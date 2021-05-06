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
            ],
            mono: [
                'SF Mono',
                'Menlo',
                'Monaco',
                'Courier New',
                'monospace'
            ]
        },
        colors: {
            transparent: 'transparent',
            primary: {
                100: 'var(--color-primary-100)',
                200: 'var(--color-primary-200)',
                300: 'var(--color-primary-300)',
                600: 'var(--color-primary-600)',
                700: 'var(--color-primary-700)',
                800: 'var(--color-primary-800)',
                900: 'var(--color-primary-900)',
            },
            secondary: {
                DEFAULT: 'var(--color-secondary)',
                'washed-out': 'var(--color-secondary-washed-out)',
            },
            accent: {
                DEFAULT: 'var(--color-accent)',
                hover: 'var(--color-accent-hover)',
                disabled: 'var(--color-accent-disabled)',
            },
            green: 'var(--color-green)',
            white: 'var(--color-white)'
        },
        fontSize: {
            tiny: '0.625rem',
            xs: '.8rem',
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
            '4l': '7rem',
            '5l': '10rem',
            'n1/2': '-50%',
            24: '24rem',
            400: '400px',
        },
        extend: {
            outline: {
                'no-chrome': 'none'
            },
            height: {
                30: '30px',
                70: '70px',
            },
            maxWidth: {
                1470: '1470px'
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
