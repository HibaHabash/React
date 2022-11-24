import React, {  useRef, useState } from "react";
import "./drop-down-list.scss";

function DropDownList( { options }){

  const Icon = () => {
    return (
      <svg className={showMenu ? 'fa1' : 'fa'} onClick={handleInputClick} >
        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
      </svg>
    );
  };

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
    };
    
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
      };
    
      const onItemClick = (option) => {
        inputRef.current.value=option.label ;
      };
    
      const onSearch = (e) => {
        setSearchValue(e.target.value);
      };
    
      const getOptions = () => {
        if (!searchValue) {
          return options;
        }
    
        return options.filter(
          (option) =>
            option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
        );
      }; 

    let scrollTimer = -1;
    const scrollFunction  = () =>{

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
     <div className="inputContainer">
      <input  placeholder= "type here" onChange={onSearch}  ref={inputRef} onClick={handleInputClick} onKeyDown={handleKey} />
        <div className="icoon" >
            <Icon />
         </div>
         {showMenu && (
        <div ref={listRef} className="list" onScroll={scrollFunction} >
          {getOptions().map((option,i) => (
            <div
              ref={el => (optionref.current.push(el))}
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