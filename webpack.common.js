'use strict';

const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: './src/index.tsx',
	output: {
		clean: true,
		filename: '[name].[contenthash].js',
    assetModuleFilename: '[name].[contenthash][ext]',
    hashDigestLength: 8,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
			{
				test: /\.(png|woff2)$/,
        type: 'asset/resource',
			},
		],
	},
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
	plugins: [
		new HtmlPlugin(),
	],
};
