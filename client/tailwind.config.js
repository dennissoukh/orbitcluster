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
            primary: {
                'primary': 'var(--color-black)',
                'secondary': 'var(--color-dark-gray)',
                'tertiary': 'var(--color-gray)',
            }
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
            }
        }
    },
    variants: {
        scrollBar: ['rounded', 'dark']
    },
    plugins: [],
}
