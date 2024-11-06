const path = require('path');

module.exports = {
    mode: 'development',  // Change to 'production' for production builds
    entry: './src/index.js', // Corrected entry point path
    output: {
        filename: 'bundle.js',  // Change to 'bundle.js'
        path: path.resolve(__dirname, 'public/dist'), // Output directory
        clean: true,  // Clean the output directory before emit
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Include both .js and .jsx files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],  // Resolve .js and .jsx extensions
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),  // Serve from the 'public' folder
        compress: true,
        port: 9000,  // Port for the dev server
        open: true,  // Automatically open the browser
        hot: true,  // Enable hot reloading
    },
};
