const path = require('path');

const webpackConfig = {
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public/js')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.css$/,
				use: [
			 		'style-loader',
			 		'css-loader'
				]
			}
		]
	},
	externals: {
    jquery: 'jQuery'
  }
};

module.exports = webpackConfig;