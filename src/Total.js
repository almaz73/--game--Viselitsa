/*Итоговая панелька - выигрыша или проигрыша*/

import React, {Component} from 'react';
import {connect} from 'react-redux';



class Total extends Component{
	nextGame(){
		this.props.onNext()
	}
	render(){
		var 
			txt="",		
			classname,	
			victoria = this.props.myState.VICTORIA;

			switch(victoria){
				case -1:
				txt =" ВЫ ПРОИГРАЛИ  ,   ПОПРОБУЕМ ЕЩЕ?";
				classname = "total totalFalse";
				break;
				case 1: 
				txt = "ПОЗДРАВЛЯЮ! ВЫ УГАДАЛИ! \n ПРОДОЛЖИМ?";
				classname = "total totalTrue";
				break;
				default:
				classname = "totalHide"
			}

		return(
			<div className={classname} onClick={this.nextGame.bind(this)}>
				{txt}
			</div>
		);
	}
}

export default connect(
	state =>({
		myState: state
	}),
	dispatch =>({
		onNext: ()=>{
			dispatch({type:"NEXT_GAME"})
		}
	})
)(Total)