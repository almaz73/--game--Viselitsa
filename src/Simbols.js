/*буквы для угадывания*/

import React, { Component } from 'react';
import {connect} from 'react-redux';



class Primer extends Component {

	addTrack(e){
		var val = e.target.innerText
		this.props.onAddTrack(val);
	}

	
  	render() {
  		var self=this,
  			SIMBOL_STATE=this.props.testStore.SIMBOL_STATE,
  			SIMBOLS =  this.props.testStore.SIMBOLS;  


	  	return(	  		
	       <div className="alfabit">	       		
	            {SIMBOLS.map(function(item, index){
	            		var classname = (SIMBOL_STATE[item])?"simbol simbolOff":"simbol";
	              return <div key={index} onClick={self.addTrack.bind(self)} className={classname}>{item}</div>
	            })}
	      </div>
	    )
  }
}


export default connect(
	state => ({
		testStore: state
	}),
	dispatch => ({
		onAddTrack:(trackname) => {
			dispatch({ type: 'SELECT_SIMBOL', bukva: trackname })
		}

	})
)(Primer);
