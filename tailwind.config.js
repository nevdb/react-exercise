import colors from './src/assets/css/colors.config.js'

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors,
        },
    },
}