/**
 * React-app-rewired, tweaking configs without ejecting create-react-app project
 *
 * 1. yarn add react-app-rewired babel-plugin-transform-decorators-legacy
 * 2. copy this file to root (same as node_modules) and name it as 'config-overrides.js'
 * 3. you can add more plugins if want, if not, skip to (4.)
 * 4. edit package.json script to use 'react-app-rewired' instead of 'react-scripts'
 *
 * "scripts": {
 *   "start": "react-app-rewired start",
 *   "build": "react-app-rewired build",
 *   "test": "react-app-rewired test --env=jsdom",
 *   ...
 * }
 *
 * 5. DONE!
 *
 * src:
 * https://github.com/timarney/react-app-rewired#how-to-rewire-your-create-react-app-project
 * https://medium.com/@timarney/but-i-dont-wanna-eject-3e3da5826e39
 */

const rewired = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')
const rewireAntd = require('react-app-rewire-antd')
const { injectBabelPlugin } = require('react-app-rewired')


module.exports = function override(config, env) {

	config = rewired.injectBabelPlugin('transform-decorators-legacy', config);
	config = rewireLess(config, env);
	config = rewireLess.withLoaderOptions({
		javascriptEnabled: true
	})(config, env);


  return config
}