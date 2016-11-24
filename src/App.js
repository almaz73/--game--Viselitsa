import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Simbols from './Simbols';
import Tree from './Tree';
import Word from './Word';
import Total from './Total';
import Counter from './Counter';

import killPic from './img/kill.png';
import savePic from './img/save.png';

let LEVEL=0;
const FEW_WORDS = "Урал,Самолёт,Вертолёт,Ракета,Планер,Автожир,Аэростат,Автомобиль,Трактор,Луна,Голова,Африка,Бассейн,Лазер,Стол,Эвкалипт,Коала,Мартышка,Снег,Жаворонок,Кастрюля,Компьютер,Ракета, Йогурт,Кольцо,Брови,Медведь,Стакан,Голос,Шрага,Лекарь,Стрекоза,Эксковатор,Антилопа,Маркетолог,Космодром,Пеликан,Ребёнок,Кровать,Реклама,Пешеход".split(",");
const SIMBOLS = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");
let SIMBOL_STATE = []; // чтобы запомнить выбрали уже букву или нет
let NumberOfWin=0;
let NumberOfLos=0;

function updateSimbols(){
  SIMBOLS.map(function(item){
      return SIMBOL_STATE[item] = false;
  });
  LEVEL = parseInt(Math.random() * FEW_WORDS.length, 10);
}
updateSimbols(); // перемешаем слова 
const VICTORIA=0; // -1 | 1 проиграл или выиграл






// создаем сторе
const store = createStore(playList);


// reducer по добавлению треков
function playList(state={SIMBOL_STATE, SIMBOLS, FEW_WORDS, LEVEL, VICTORIA, NumberOfWin, NumberOfLos}, action ){
	var newState;

 	switch (action.type) {
      case 'END_GAME':
      	var newVictoria = action.win;
      	newState = Object.assign({}, state, state.VICTORIA = newVictoria); //имутабельно обновляем параметры
        return newState;

      case 'NEXT_GAME':
         updateSimbols();      	 
      	 newState = Object.assign({}, state, state.VICTORIA = 0, state.SIMBOL_STATE = SIMBOL_STATE, state.LEVEL = LEVEL ); //имутабельно обновляем параметры
         return newState;

      case 'HISTORY':   
          var 
            newNumberOfWin=state.NumberOfWin,
            newNumberOfLos=state.NumberOfLos;           
         if (action.totalCount===1){ newNumberOfWin++;}
         if (action.totalCount===-1) { newNumberOfLos++}
         newState = Object.assign({}, state, state.NumberOfLos = newNumberOfLos, state.NumberOfWin = newNumberOfWin ); 
         return newState;         

      case 'SELECT_SIMBOL':
         var
            bukva=action.bukva;
         newState = Object.assign({}, state, state.SIMBOL_STATE[bukva] = true ); //имутабельность (не менять а создать другое)
         return newState;
      default:
         return state
   }
}


store.subscribe(()=>{
  //console.log("############# Изменилось");
	//console.log(" ###################ИЗМЕНИЛОСЬ", store.getState());	


  var 
      state = store.getState(),
      Level = state.LEVEL,
      myWord = state.FEW_WORDS[Level].toUpperCase().split(""),
      SIMBOLS =  state.SIMBOLS,
      SIMBOL_STATE = state.SIMBOL_STATE,
      VICTORIA = state.VICTORIA,
      Qerror=0,
      Qtrue=0;

// находим буквы которых нет в слове а они выбраны
   SIMBOLS.map(function(item){
      if(SIMBOL_STATE[item] && myWord.indexOf(item)===-1){
        Qerror++;
        if(Qerror>6) {Qerror=6}
      } 
   
      return Qerror;
    });

   // находим все ли буквы в слове угаданы
       
    myWord.map(function(item, index){
      if( SIMBOL_STATE[item] ){
          Qtrue++;
      }
      return Qtrue;
    })


    if(Qerror>5 && VICTORIA!==-1){
      store.dispatch({ type: 'END_GAME', win: -1 });
      store.dispatch({ type: 'HISTORY', totalCount: -1 });

    }

    if(Qtrue===myWord.length && VICTORIA!==1){
      store.dispatch({ type: 'END_GAME', win: 1 });
      store.dispatch({ type: 'HISTORY', totalCount: 1 });
    }

});

ReactDOM.render(  
	<Provider store={store}>
		<div>
      <div className='titleSpan'>
        <Counter type='kill' />
        <img src={killPic} alt="kill"/>
  			<h1>Виселица</h1>
        <img src={savePic} alt="save"/>
         <Counter type='save' />
      </div>
			<span>
				<Tree />
				<Word />
			</span>
  			<Simbols />      
  			<Total />
  		</div>
  	</Provider>,
  	document.getElementById('root')
);




