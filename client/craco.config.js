module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
    plugins: [
        { plugin: require('craco-cesium')() },
    ],
}
