/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
/*
	控制模块
	读取url和$config内容覆盖到$上
*/
export default ($, keys) => {
	keys.forEach((key) => {
		if(window.$config.hasOwnProperty(key)){
			$[key] = window.$config[key];
		}
		var urlConfig = $.querySearch('$' + key);
		if(urlConfig){
			$[key] = urlConfig;
		}
	});
}