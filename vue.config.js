const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const TerserPlugin = require('terser-webpack-plugin');
const IS_PROD = ['production', 'prod', 'cib', 'cibp', 'uat'].includes(process.env.NODE_ENV);

module.exports = {
	publicPath: IS_PROD ? '/qdp2-capricornus-h5/' : '/', //如果部署不在是根路径需要做修改
	lintOnSave: IS_PROD,
	parallel: require('os').cpus().length > 1,
	devServer: {
		open: true,
		port: 8080,
		https: false,
		hotOnly: false,
		disableHostCheck: true,
		public: '0.0.0.0:8080',
		// proxy: 'https://xycapricorn.uat.qdingnet.com',
		proxy: 'https://aries.qa.qdingnet.com',
		// proxy: {
		// 	'/api': {
		// 		// http://test-api.elementcastle.com
		// 		target: 'http://localhost:7878',
		// 		ws: false,
		// 		changOrigin: true // 是否将请求header中的origin修改为目标地址
		// 		// pathRewrite: {
		// 		//   '^/api': ''
		// 		// }
		// 	},
		// },
		overlay: {
			warnings: true,
			errors: true,
		},
	},
	configureWebpack: config => {
		config.resolve.extensions = ['.js', '.vue', '.scss', '.json'];
		config.optimization = {
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						ecma: undefined,
						warnings: false,
						parse: {},
						compress: {
							drop_console: !(process.env.VUE_APP_LOG === 'yes'),
							drop_debugger: !(process.env.VUE_APP_LOG === 'yes'),
							pure_funcs: [process.env.VUE_APP_LOG === 'yes' ? '' : 'console.log'], // 移除console
						},
					},
				}),
			],
		};
	},
	chainWebpack: config => {
		// 修复HMR
		config.resolve.symlinks(true);
		config.resolve.alias.set('@', resolve('src'));
		if (IS_PROD) {
			config.module
				.rule('images')
				.test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
				.use('url-loader')
				.loader('url-loader')
				.tap(options => {
					options.esModule = false;
					options.fallback.options.name = 'img/[name].[hash:8].[ext]';
					options.limit = 10000;
					return options;
				});
		}
	},
	productionSourceMap: false,
	css: {
		loaderOptions: {
			sass: {
				data: `
          @import "@/common/assets/css/variables.scss";
        `,
			},
		},
	},
};
