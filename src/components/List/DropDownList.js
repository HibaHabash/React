import React, {  useReducer, useRef } from "react";
import "./drop-down-list.scss";
import Arrow from '../../assets/images/Arrow-down.svg'

function DropDownList( { options }){

  const initialState ={
    scrollTimer :-1,
    cursor : 0,
    showMenu : false,
    searchValue: ""
  };

  function reducer(state,action){

    switch(action.type){
  
      case 'SCROLL':{
        return {
          ...state,
          scrollTimer:state.scrollTimer +1 
        };
      }
  
      case 'CURSOR':{
          if (action.id === 0){
            return {
              ...state,
              cursor : 0
            };  
          }
          else if (action.id === 1){
            return{
              ...state,
              cursor :  state.cursor < options.length - 1 ? state.cursor + 1 : state.cursor 
            };
          }
          else if (action.id === -1){
            return{
              ...state,
              cursor :state.cursor > 0 ? state.cursor - 1 : state.cursor
            };
          }
          else if (action.id === -2){
            return{
              ...state,
              cursor : -1 
            };
          }
          else if (action.id === 2){
            return{
              ...state,
              cursor : options.length
            };
          }
          else {
            return state;
          }
      }

      case 'MENU':{
        if (action.id === -1){
          return {
            ...state,
            showMenu : false
          };
        }
        else if (action.id === 1){
          return {
            ...state,
            showMenu : !state.showMenu
          };
        }
        else {
          return state;
        }
      }
      
      case 'SEARCH':{
        return {
          ...state,
          searchValue : event.target.value
        };
      }

      default :{
        return state;
      }
    }
  }

  const [state , dispatch]=useReducer(reducer, initialState);
  const { scrollTimer ,cursor ,showMenu, searchValue }= state ;
  const inputRef = useRef();
  const listRef = useRef();
  const optionref=useRef([]);
   
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        dispatch({ type: 'MENU', id : -1 });
        inputRef.current.placeholder="type here";
      }
    }
    
    const handleInputClick = (e) => {
        e.stopPropagation();
        dispatch({ type: 'MENU', id : 1 });
        if (!showMenu){
          dispatch({ type: 'CURSOR', id : 0 });
          inputRef.current.placeholder="select";
        }
        else{
          inputRef.current.placeholder="type here";
        }
      }
    
      const onItemClick = (option) => {
        inputRef.current.value=option.label ;
      }
    
      const onSearch = () => {
        dispatch({ type: 'SEARCH'});
      }
    
      const getOptions = () => {
        if (!searchValue) {
          return options;
        }
        return options.filter(
          (option) =>
            option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
        );
      }

    const scrollFunction  = () => {
      listRef.current.classList.add("is-scrolling");
      dispatch({ type: 'SCROLL' });
        if (scrollTimer !== -1)
        clearTimeout(scrollTimer);
        window.setTimeout(scrollFinished, 500);
    }
    const scrollFinished  = () => {
      listRef.current.classList.remove("is-scrolling");
    }

    const handleKey = (event) =>{
             
        if (event.key === "ArrowDown"){
            dispatch({ type: 'CURSOR', id : 1 });
            if (cursor>options.length-2){
              dispatch({ type: 'CURSOR', id : -2 });
             optionref.current[cursor].scrollIntoView(false);
            }
            else
            optionref.current[cursor+1].scrollIntoView(false);
        }
        if (event.key === "ArrowUp" ){
            dispatch({ type: 'CURSOR', id : -1 });
            if (cursor<=0){
              dispatch({ type: 'CURSOR', id : 2 });
             optionref.current[cursor].scrollIntoView(false);
            }
            else
            optionref.current[cursor-1].scrollIntoView(false);
        }
        if (event.key === "Enter"){
           inputRef.current.value=options[cursor].label;
           dispatch({ type: 'CURSOR', id : 0 });
           dispatch({ type: 'MENU', id : 1 });
        }
    }
   
   return(
    <div className="container" onClick={handler}>
     <div className="input-container">
      <input  placeholder= "type here" onChange={onSearch}  ref={inputRef} onClick={handleInputClick} onKeyDown={handleKey} />
        <div  >
            <img src={Arrow} className={showMenu ? 'arrow-up' : 'arrow-down'} onClick={handleInputClick}/>
         </div>
         {showMenu && (
        <div ref={listRef} className="list" onScroll={scrollFunction} >
          {getOptions().map((option,i) => (
            <div
              ref={ref => (optionref.current[i] = ref)}
              onClick={() => onItemClick(option)}
              key={option.value}
              className={`dropdown-item ${cursor===i ? "item": ""}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      </div>  

    </div>
   );
   
}
export default DropDownList;