import React from "react";
import "./style.scss";
import Arrow from '../../assets/images/Arrow-down.svg'

 const List = ( options ) =>{
 
  

   return(
    <div className="container">
     <div className="input-container">
      <input  placeholder= "type here" />
            <img src={Arrow} className={ options ? 'arrow-up' : 'arrow-down'} />
         { (
        <div className="list" >
          {/* {getOptions().map((option,i) => (
            <div
              id={i}
              tabIndex={0}
              key={option.value}
              className="dropdown-item"
            >
              {option.label}
            </div>
          ))} */}
        </div>
      )}
      </div>  

    </div>
   );
   
}
export default List;