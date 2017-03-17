const lodash = require('lodash');
const sum = require('./a');
// const B = require('./b')
import B from './b'
console.log("==>",B)
// window.jQuery=require('jquery');
require('bootstrap/dist/css/bootstrap.min.css');
require('./sa.scss')
require("expose-loader?!jquery");
// require("expose-loader?!react");
// require("expose-loader?!react-dom");
// 插件注入jquery

require('bootstrap');
// // require('./styles.css')
// function component() {
//     var element = document.createElement('div');
//
//     /* 需要引入 lodash，下一行才能正常工作 */
//     var l = sum(3, 4);
//
//     element.innerHTML = lodash.join(['aassw22', 'webpack', 'xc', l], ' ');
//     return element;
// }
//
// document.body.appendChild(component());

const React = require('react');
var ReactDOM = require('react-dom');

var Hello = React.createClass({

    getInitialState(){
        return {
            a:1,
        }
    },

    render: function render() {
        return <div className="a">2122w {this.state.a}--{this.props.name}<button onClick={()=>{this.setState({a:2})}}>tets</button></div>;
    }
});
const Home=require('./Home');
ReactDOM.render(
    <Home />,
    document.getElementById('body')
);

//接受热更新,同时命令加上--hot
// module.hot.accept();
console.log("==>xxsxae")