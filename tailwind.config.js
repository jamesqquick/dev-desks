module.exports = {
    purge: ['./pages/**/*.js', './components/**/*.js'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'accent-green': {
                    100: '#68d493',
                    200: '#54ce85',
                    300: '#40c976',
                    400: '#35ba6a',
                    500: '#2fa65f',
                    600: '#2a9253',
                    700: '#247e48',
                    800: '#0f371f',
                    900: '#0a2515',
                },
            },
            maxHeight: {
                0: '0',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75vh',
                full: '100%',
            },
        },
    },
    variants: {
        borderWidth: ['responsive', 'hover'],
    },
    plugins: [],
};
