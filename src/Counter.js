/*показываем числа*/
import React, {Component} from 'react';
import {connect} from 'react-redux';

class Count extends Component{
	render(){
		var txt;
		if(this.props.type==='save'){
			txt = this.props.myState.NumberOfWin;
		} else{
			txt = this.props.myState.NumberOfLos;
		}
		return(
			<p>{txt}</p>
		)
	}
}

export default connect(
	state =>({
		myState: state
	})
)(Count)