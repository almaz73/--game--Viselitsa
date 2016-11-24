/*Виселица*/

import React, {Component} from 'react';
import {connect} from 'react-redux';
import q0 from './img/q0.png'
import q1 from './img/q1.png'
import q2 from './img/q2.png'
import q3 from './img/q3.png'
import q4 from './img/q4.png'
import q5 from './img/q5.png'
import q6 from './img/q6.png'


class Tree extends Component{
	render(){

		var 
		 	Level = this.props.myState.LEVEL,
		 	myWord = this.props.myState.FEW_WORDS[Level].toUpperCase().split(""),
		 	SIMBOLS =  this.props.myState.SIMBOLS,
		 	SIMBOL_STATE = this.props.myState.SIMBOL_STATE,
		 	images = [q0,q1,q2,q3,q4,q5,q6],
		 	Q = 0; // от 1 одо 6// иначе трагическая мызывка и игра заканчивается
		 	

		// находим буквы которых нет в слове а они выбраны
		SIMBOLS.map(function(item){
			if(SIMBOL_STATE[item] && myWord.indexOf(item)===-1){
				Q++;
				if(Q>6) {Q=6}
			}
			return Q;
		});
		 	
		return(
			<div>
				<img src={images[Q]}  alt="рис"/>
			</div>
		)
	}
}



export default connect(
	state =>({
		myState: state
	})
)(Tree)

