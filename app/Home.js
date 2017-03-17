
// var Hello = React.createClass({
//
//     getInitialState(){
//         return {
//             a:1,
//         }
//     },
//
//     render: function render() {
//         return <div className="a">222\e {this.state.a}--{this.props.name}<button onClick={()=>{this.setState({a:2})}}>tets</button></div>;
//     }
// });
//
// module.exports=Hello;

import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            a:1
        }
    }

    render() {
        return <div className="a">aas {this.state.a}<button onClick={()=>{this.setState({a:2})}}>tets</button></div>;
    }
}
module.exports=App;