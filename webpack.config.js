const path = require('path');

module.exports = {
    entry: './public/src/index.js', // Path to your entry file
    output: {
        path: path.resolve(__dirname, 'public/dist'), // Path to the output directory
        filename: 'index.js', // Output filename
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Match all .js files
                exclude: /node_modules/, // Exclude node_modules folder
                use: {
                    loader: 'babel-loader', // Use Babel loader for transpiling
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js'], // Resolve .js files
    },
    mode: 'development', // Set mode to development
};