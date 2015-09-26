export default ($) => {
	var defaultConfig = {
		debug : false,
		env : $.env,
		isLocal : $.isLocal,
		os : $.os,
		pixelRatio : window.devicePixelRatio
	};
	window.$config = $.parse($.merge(defaultConfig, window.$config), $.querySearch());
}