import React, {  useRef, useState } from "react";
import "./drop-down-list.scss";
import Arrow from '../../assets/images/Arrow-down.svg'

function DropDownList( { options }){


  const [cursor, setCursor] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef();
  const listRef = useRef();
  const optionref=useRef([]);
   

    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
        inputRef.current.placeholder="type here";
      }
    }
    
    const handleInputClick = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
        if (!showMenu){
          setCursor(0);
          inputRef.current.placeholder="select";
        }
        else{
          inputRef.current.placeholder="type here";
        }
      }
    
      const onItemClick = (option) => {
        inputRef.current.value=option.label ;
      }
    
      const onSearch = (e) => {
        setSearchValue(e.target.value);
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
      let scrollTimer = -1;
      listRef.current.classList.add("is-scrolling");
        if (scrollTimer !== -1)
        clearTimeout(scrollTimer);
         scrollTimer = window.setTimeout(scrollFinished, 500); 
    }
    const scrollFinished  = () => {
      listRef.current.classList.remove("is-scrolling");
    }

    const handleKey = (event) =>{
             
        if (event.key === "ArrowDown"){
            setCursor(prevState => prevState < options.length - 1 ? prevState + 1 : prevState );
            if (cursor>options.length-2){
             setCursor(-1);
             optionref.current[cursor].scrollIntoView(false);
            }
            else
            optionref.current[cursor+1].scrollIntoView(false);
        }
        if (event.key === "ArrowUp" ){
            setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
            if (cursor<=0){
             setCursor(options.length);
             optionref.current[cursor].scrollIntoView(false);
            }
            else
            optionref.current[cursor-1].scrollIntoView(false);
        }
        if (event.key === "Enter"){
           inputRef.current.value=options[cursor].label;
           setShowMenu(!showMenu);
           setCursor(0);
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