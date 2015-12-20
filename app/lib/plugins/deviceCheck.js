/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
export default ($) => {
    if(!('defineProperty' in Object)){
        alert('系统版本太低，暂不支持');
        window.close();
    }
}