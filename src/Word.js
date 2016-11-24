/*Предлагаемое слова для угадывания*/

import React, {Component} from 'react';
import {connect} from 'react-redux';


class Word extends Component{

	render (){
		var 
		 	Level = this.props.myState.LEVEL,
		 	myWord = this.props.myState.FEW_WORDS[Level].toUpperCase().split(""),
		 	SIMBOL_STATE = this.props.myState.SIMBOL_STATE;

		return (
			
			<div className="word">	       		
	            {myWord.map(function(item, index){
	            	var txt=( SIMBOL_STATE[item] )?item:" ";
	              	return <div key={index} className="simbol">{txt}</div>
	            })}
	      	</div>
		)
	}
}



export default connect(
	state => ({
		myState: state
	})
)(Word);