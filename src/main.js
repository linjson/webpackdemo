import css from './css/test.css';
import test2 from './css/test2.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
console.log("==>",_.defaults({a:"x"},{b:'s'}));


class Hello extends React.Component{
    constructor(){
        super();
        this.state={
            a:1,
        }
    }

    render(){
        return <div className="a">2122w {this.state.a}--{this.props.name}<button onClick={()=>{this.setState({a:2})}}>tets</button></div>;;
    }
}



ReactDOM.render(
    <Hello />,
    document.getElementById('body')
);

