const path = require('path');

module.exports = {
    mode: 'development', // Change to 'production' for production builds
    entry: './public/src/index.js', // Adjust entry point as needed
    output: {
        filename: 'index.js', // Output filename
        path: path.resolve(__dirname, 'public/dist'), // Output path
        clean: true, // Clean the output directory before emit
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
        extensions: ['.js', '.jsx'], // Add .jsx to the list of extensions to resolve
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),  // Directory to serve
        compress: true,
        port: 9000,  // You can change the port if needed
    },
};