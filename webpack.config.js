// webpack.config.js

'use strict'

const path = require('path')
const webpack = require('webpack')
const { bundler, styles } = require('@ckeditor/ckeditor5-dev-utils')
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  devtool: 'source-map',
	performance: { hints: false },
	// https://webpack.js.org/configuration/entry-context/
  entry: path.resolve(__dirname, 'app.js'),
	// https://webpack.js.org/configuration/output/
	output: {
    library: 'SbEditor',
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
	},
  optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						// Preserve CKEditor 5 license comments.
						comments: /^!/,
					},
				},
				extractComments: false,
			}),
		],
	},
  plugins: [
		new CKEditorWebpackPlugin({
			// UI language. Language codes follow the https://en.wikipedia.org/wiki/ISO_639-1 format.
			// When changing the built-in language, remember to also change it in the editor's configuration (src/ckeditor.js).
			language: 'en',
			additionalLanguages: 'all',
		}),
		new webpack.BannerPlugin({
			banner: bundler.getLicenseBanner(),
			raw: true,
		}),
	],
	module: {
		rules: [
			{
				test: /\.svg$/,

				use: ['raw-loader'],
			},
			{
				test: /\.css$/,


				use: [
					{
						loader: 'style-loader',
						options: {
							injectType: 'singletonStyleTag',
							attributes: {
								'data-cke': true,
							},
						},
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: styles.getPostCssConfig({
								themeImporter: {
									themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
								},
								minify: true,
							}),
						},
					},
				],
			},
		],
	},

	// Useful for debugging.
	devtool: 'source-map',

	// By default webpack logs warnings if the bundle is bigger than 200kb.
	performance: { hints: false },
}
