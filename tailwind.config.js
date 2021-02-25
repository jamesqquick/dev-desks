module.exports = {
    purge: {
        content: ['./pages/**/*.js', './components/**/*.js'],
        options: {
            safelist: [
                'bg-red-100',
                'border-red-500',
                'text-red-900',
                'text-red-500',
                'bg-green-100',
                'border-green-500',
                'text-green-900',
                'text-green-500',
                'bg-info-100',
                'border-info-500',
                'text-info-900',
                'text-info-500',
            ],
        },
    },
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
