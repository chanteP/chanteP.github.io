export default (node) => {
    React.render(
        <div>
            <i className="icon succ"></i>
            <i className="icon error"></i>
            <i className="icon info"></i>
            <i className="icon warn"></i>
            <br />
            <i className="icon check"> 普通的icon</i>
            <i className="icon red close"> 普通的icon</i>
            <br />
            <i className="icon plus"> 添加</i>
            <i className="icon minus red"> 删除</i>
            <br />
            <i className="icon transparent close"> 一个简单的x</i>
            <i className="icon ti-github"> 其他</i>
        </div>
    , node);
}